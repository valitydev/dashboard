import { Injectable } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { toMinor } from '@vality/ng-core';
import {
    InvoiceLineTaxMode,
    InvoiceLineTaxVAT,
    InvoiceTemplateAndToken,
    InvoiceTemplateCreateParams,
    InvoiceTemplateDetails,
    InvoiceTemplateLineCost,
    InvoiceTemplateLineCostFixed,
    InvoiceTemplateLineCostRange,
    InvoiceTemplateLineCostUnlim,
    InvoiceTemplateMultiLine,
    InvoiceTemplateSingleLine,
    LifetimeInterval,
    Shop,
} from '@vality/swag-payments';
import moment from 'moment';
import { merge, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, share, shareReplay, switchMap, take } from 'rxjs/operators';

import {
    InvoiceTemplatesService,
    InvoiceTemplateType,
    InvoiceTemplateLineCostType,
} from '@dsh/app/api/payments';
import { filterError, filterPayload, progress, replaceError } from '@dsh/app/custom-operators';

export const WITHOUT_VAT = Symbol('without VAT');

@Injectable()
export class CreateInvoiceTemplateService {
    private nextInvoiceTemplate$ = new Subject<InvoiceTemplateCreateParams>();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    invoiceTemplateAndToken$: Observable<InvoiceTemplateAndToken>;
    // eslint-disable-next-line @typescript-eslint/member-ordering
    errors$: Observable<unknown>;
    // eslint-disable-next-line @typescript-eslint/member-ordering
    isLoading$: Observable<boolean>;

    // eslint-disable-next-line @typescript-eslint/member-ordering
    nextInvoiceTemplateAndToken$: Observable<InvoiceTemplateAndToken>;

    constructor(
        private fb: UntypedFormBuilder,
        private invoiceTemplatesService: InvoiceTemplatesService,
    ) {
        const createInvoiceTemplate$ = this.nextInvoiceTemplate$.pipe(
            distinctUntilChanged((x, y) => JSON.stringify(x) === JSON.stringify(y)),
            share(),
        );
        const notCreatedInvoiceTemplate$ = this.nextInvoiceTemplate$.pipe(
            distinctUntilChanged((x, y) => JSON.stringify(x) !== JSON.stringify(y)),
            share(),
        );
        const invoiceTemplateAndTokenWithErrors$ = createInvoiceTemplate$.pipe(
            switchMap((invoiceTemplateCreateParams) =>
                this.invoiceTemplatesService
                    .createInvoiceTemplate({ invoiceTemplateCreateParams })
                    .pipe(replaceError),
            ),
            share(),
        );
        this.invoiceTemplateAndToken$ = invoiceTemplateAndTokenWithErrors$.pipe(
            filterPayload,
            shareReplay(1),
        );
        this.errors$ = invoiceTemplateAndTokenWithErrors$.pipe(filterError, shareReplay(1));
        this.isLoading$ = progress(createInvoiceTemplate$, invoiceTemplateAndTokenWithErrors$).pipe(
            shareReplay(1),
        );

        this.nextInvoiceTemplateAndToken$ = merge(
            this.invoiceTemplateAndToken$,
            notCreatedInvoiceTemplate$.pipe(
                switchMap(() => this.invoiceTemplateAndToken$.pipe(take(1))),
            ),
        ).pipe(share());

        merge(
            this.invoiceTemplateAndToken$,
            this.errors$,
            this.isLoading$,
            this.nextInvoiceTemplateAndToken$,
        ).subscribe();
    }

    create(formValue, shops: Shop[]) {
        this.nextInvoiceTemplate$.next(this.getInvoiceTemplateCreateParams(formValue, shops));
    }

    createForm(shops: Shop[]): UntypedFormGroup {
        return this.fb.group({
            shopID: shops[0].id,
            lifetime: moment().add('1', 'month').endOf('day'),
            costType: InvoiceTemplateLineCostType.InvoiceTemplateLineCostFixed,
            templateType: InvoiceTemplateType.InvoiceTemplateSingleLine,
            product: '',
            taxMode: WITHOUT_VAT,
            cart: this.fb.array([this.createProductFormGroup()]),
            range: this.fb.group({
                lowerBound: null,
                upperBound: null,
            }),
            randomizeAmount: null,
            amount: null,
        });
    }

    private createProductFormGroup() {
        return this.fb.group({
            product: '',
            quantity: null,
            price: null,
            taxMode: WITHOUT_VAT,
        });
    }

    private getInvoiceTemplateCreateParams(formValue, shops: Shop[]): InvoiceTemplateCreateParams {
        return {
            shopID: formValue.shopID,
            lifetime: this.getLifetimeInterval(formValue),
            details: this.getInvoiceTemplateDetails(formValue, shops),
            randomizeAmount: formValue.randomizeAmount || undefined,
        };
    }

    private getLifetimeInterval(formValue): LifetimeInterval {
        const { lifetime } = formValue;
        const diff = moment(lifetime).diff(moment().startOf('day'));
        const duration = moment.duration(diff);
        return {
            days: duration.days(),
            months: duration.months(),
            years: duration.years(),
        };
    }

    private getInvoiceTemplateDetails(formValue, shops: Shop[]): InvoiceTemplateDetails {
        const { cart, shopID } = formValue;
        const value = formValue;
        const currency = this.getCurrencyByShopID(shopID, shops);
        switch (value.templateType) {
            case InvoiceTemplateType.InvoiceTemplateSingleLine:
                return {
                    templateType: value.templateType,
                    product: value.product,
                    price: this.getInvoiceTemplateLineCost(formValue, shops),
                    ...this.getInvoiceLineTaxMode(value.taxMode),
                } as InvoiceTemplateSingleLine;
            case InvoiceTemplateType.InvoiceTemplateMultiLine:
                return {
                    templateType: value.templateType,
                    cart: cart.map((c) => ({
                        product: c.product,
                        quantity: c.quantity,
                        price: toMinor(c.price, c.currency),
                        ...this.getInvoiceLineTaxMode(c.taxMode),
                    })),
                    currency,
                } as InvoiceTemplateMultiLine;
        }
    }

    private getInvoiceTemplateLineCost(formValue, shops: Shop[]): InvoiceTemplateLineCost {
        const { costType, amount, range, shopID } = formValue;
        const currency = this.getCurrencyByShopID(shopID, shops);
        switch (costType) {
            case InvoiceTemplateLineCostType.InvoiceTemplateLineCostUnlim:
                return { costType } as InvoiceTemplateLineCostUnlim;
            case InvoiceTemplateLineCostType.InvoiceTemplateLineCostFixed:
                return {
                    costType,
                    currency,
                    amount: toMinor(amount, currency),
                } as InvoiceTemplateLineCostFixed;
            case InvoiceTemplateLineCostType.InvoiceTemplateLineCostRange:
                return {
                    costType,
                    currency,
                    range: {
                        lowerBound: toMinor(range.lowerBound, currency),
                        upperBound: toMinor(range.upperBound, currency),
                    },
                } as InvoiceTemplateLineCostRange;
        }
    }

    private getInvoiceLineTaxMode(rate: typeof WITHOUT_VAT | InvoiceLineTaxVAT.RateEnum) {
        return rate === WITHOUT_VAT
            ? {}
            : {
                  taxMode: {
                      type: InvoiceLineTaxMode.TypeEnum.InvoiceLineTaxVat,
                      rate,
                  },
              };
    }

    private getCurrencyByShopID(shopID: string, shops: Shop[]): string {
        return shops.find((s) => s.id === shopID)?.currency;
    }
}
