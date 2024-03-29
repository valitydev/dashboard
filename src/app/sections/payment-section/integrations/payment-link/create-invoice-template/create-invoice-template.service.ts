import { Injectable } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { toMinor, DialogResponseStatus } from '@vality/ng-core';
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
import * as moment from 'moment';
import { combineLatest, merge, Observable, Subject } from 'rxjs';
import {
    distinctUntilChanged,
    filter,
    map,
    share,
    shareReplay,
    startWith,
    switchMap,
    take,
} from 'rxjs/operators';

import {
    InvoiceTemplatesService,
    InvoiceTemplateType,
    InvoiceTemplateLineCostType,
} from '@dsh/app/api/payments';
import {
    filterError,
    filterPayload,
    progress,
    replaceError,
    SHARE_REPLAY_CONF,
} from '@dsh/app/custom-operators';
import { ConfirmActionDialogComponent } from '@dsh/components/popups';

export const WITHOUT_VAT = Symbol('without VAT');

@Injectable()
export class CreateInvoiceTemplateService {
    private nextInvoiceTemplate$ = new Subject<InvoiceTemplateCreateParams>();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    form = this.createForm();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    summary$ = this.cartForm.valueChanges.pipe(
        // TODO: add form types
        startWith(this.cartForm.value),
        map((v) => v.reduce((sum, c) => sum + c.price * c.quantity, 0)),
        shareReplay(1),
    );

    // eslint-disable-next-line @typescript-eslint/member-ordering
    invoiceTemplateAndToken$: Observable<InvoiceTemplateAndToken>;
    // eslint-disable-next-line @typescript-eslint/member-ordering
    errors$: Observable<unknown>;
    // eslint-disable-next-line @typescript-eslint/member-ordering
    isLoading$: Observable<boolean>;

    // eslint-disable-next-line @typescript-eslint/member-ordering
    nextInvoiceTemplateAndToken$: Observable<InvoiceTemplateAndToken>;

    get cartForm() {
        return this.form.controls.cart as UntypedFormArray;
    }

    constructor(
        private fb: UntypedFormBuilder,
        private invoiceTemplatesService: InvoiceTemplatesService,
        private dialog: MatDialog,
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

        this.subscribeFormChanges();
        merge(
            this.invoiceTemplateAndToken$,
            this.errors$,
            this.isLoading$,
            this.nextInvoiceTemplateAndToken$,
        ).subscribe();
    }

    create(shops: Shop[]) {
        this.nextInvoiceTemplate$.next(this.getInvoiceTemplateCreateParams(shops));
    }

    clear() {
        this.dialog
            .open(ConfirmActionDialogComponent)
            .afterClosed()
            .pipe(filter((r) => r.status === DialogResponseStatus.Success))
            .subscribe(() => {
                this.cartForm.clear();
                this.addProduct();
                this.form.reset(this.createForm().value);
            });
    }

    addProduct() {
        this.cartForm.push(this.createProductFormGroup());
    }

    removeProduct(idx: number) {
        this.cartForm.removeAt(idx);
    }

    private subscribeFormChanges() {
        const templateType$ = this.form.controls.templateType.valueChanges.pipe(
            startWith<InvoiceTemplateType>(this.form.value.templateType),
            shareReplay(SHARE_REPLAY_CONF),
        );
        const costType$ = this.form.controls.costType.valueChanges.pipe(
            startWith(this.form.value.costType),
        );
        templateType$.subscribe((templateType) => {
            const { product } = this.form.controls;
            if (templateType === InvoiceTemplateType.InvoiceTemplateMultiLine) {
                this.cartForm.enable();
                product.disable();
            } else {
                this.cartForm.disable();
                product.enable();
            }
        });
        combineLatest([templateType$, costType$]).subscribe(([templateType, costType]) => {
            const { amount, range } = this.form.controls;
            if (
                templateType === InvoiceTemplateType.InvoiceTemplateMultiLine ||
                costType === InvoiceTemplateLineCostType.InvoiceTemplateLineCostUnlim
            ) {
                range.disable();
                amount.disable();
                return;
            }
            switch (costType) {
                case InvoiceTemplateLineCostType.InvoiceTemplateLineCostRange:
                    range.enable();
                    amount.disable();
                    return;
                case InvoiceTemplateLineCostType.InvoiceTemplateLineCostFixed:
                    range.disable();
                    amount.enable();
                    return;
            }
        });
    }

    private createForm() {
        return this.fb.group({
            shopID: '',
            lifetime: '',
            costType: InvoiceTemplateLineCostType.InvoiceTemplateLineCostUnlim,
            templateType: InvoiceTemplateType.InvoiceTemplateSingleLine,
            product: '',
            taxMode: WITHOUT_VAT,
            cart: this.fb.array([this.createProductFormGroup()]),
            range: this.fb.group({
                lowerBound: null,
                upperBound: null,
            }),
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

    private getInvoiceTemplateCreateParams(shops: Shop[]): InvoiceTemplateCreateParams {
        const { value } = this.form;
        return {
            shopID: value.shopID,
            lifetime: this.getLifetimeInterval(),
            details: this.getInvoiceTemplateDetails(shops),
        };
    }

    private getLifetimeInterval(): LifetimeInterval {
        const { lifetime } = this.form.value;
        const diff = moment(lifetime).diff(moment().startOf('day'));
        const duration = moment.duration(diff);
        return {
            days: duration.days(),
            months: duration.months(),
            years: duration.years(),
        };
    }

    private getInvoiceTemplateDetails(shops: Shop[]): InvoiceTemplateDetails {
        const {
            value,
            value: { cart, shopID },
        } = this.form;
        const currency = this.getCurrencyByShopID(shopID, shops);
        switch (value.templateType) {
            case InvoiceTemplateType.InvoiceTemplateSingleLine:
                return {
                    templateType: value.templateType,
                    product: value.product,
                    price: this.getInvoiceTemplateLineCost(shops),
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

    private getInvoiceTemplateLineCost(shops: Shop[]): InvoiceTemplateLineCost {
        const { costType, amount, range, shopID } = this.form.value;
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
