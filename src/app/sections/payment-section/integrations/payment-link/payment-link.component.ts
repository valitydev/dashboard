import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { NotifyLogService } from '@vality/matez';
import { PaymentMethod } from '@vality/swag-payments';
import { BehaviorSubject, EMPTY, ReplaySubject, Subject, Subscription, defer, merge } from 'rxjs';
import { catchError, map, mapTo, shareReplay, switchMap } from 'rxjs/operators';

import { InvoiceTemplatesService, InvoicesService } from '@dsh/app/api/payments';
import { ShopsDataService } from '@dsh/app/shared';
import { CreatePaymentLinkService } from '@dsh/app/shared/services/create-payment-link';
import { progressTo } from '@dsh/utils';

import { filterShopsByRealm } from '../../operations/operators';

import { InvoiceOrInvoiceTemplate, Type } from './create-invoice-or-invoice-template';

enum Step {
    InvoiceTemplate,
    PaymentLink,
}

@Component({
    selector: 'dsh-payment-link',
    templateUrl: 'payment-link.component.html',
    styleUrls: ['payment-link.component.scss'],
    standalone: false,
})
export class PaymentLinkComponent {
    step = Step;
    currentStep$ = new BehaviorSubject(Step.InvoiceTemplate);
    invoiceOrInvoiceTemplate: InvoiceOrInvoiceTemplate;

    paymentMethods$ = new ReplaySubject<PaymentMethod[]>(1);
    formControl = new FormControl();
    paymentLink$ = merge(
        defer(() => this.create$).pipe(
            switchMap(() =>
                (this.invoiceOrInvoiceTemplate.type === Type.Invoice
                    ? this.createPaymentLinkService.createPaymentLinkByInvoice(
                          this.invoiceOrInvoiceTemplate.invoiceOrInvoiceTemplate,
                          this.formControl.value,
                      )
                    : this.createPaymentLinkService.createPaymentLinkByTemplate(
                          this.invoiceOrInvoiceTemplate.invoiceOrInvoiceTemplate,
                          this.formControl.value,
                      )
                ).pipe(
                    progressTo(() => this.progress$),
                    catchError((err) => {
                        this.log.error(
                            err,
                            this.transloco.selectTranslate(
                                'paymentLink.errors.createPaymentLinkError',
                                null,
                                'payment-section',
                            ),
                        );
                        return EMPTY;
                    }),
                ),
            ),
        ),
        this.formControl.valueChanges.pipe(mapTo('')),
    ).pipe(shareReplay(1));
    progress$ = new BehaviorSubject(0);

    shops$ = this.route.params.pipe(
        map((params) => params?.realm),
        filterShopsByRealm(this.shopsDataService.shops$),
        shareReplay({ refCount: true, bufferSize: 1 }),
    );

    private create$ = new Subject<void>();

    constructor(
        private invoicesService: InvoicesService,
        private invoiceTemplatesService: InvoiceTemplatesService,
        private createPaymentLinkService: CreatePaymentLinkService,
        private log: NotifyLogService,
        private transloco: TranslocoService,
        private route: ActivatedRoute,
        private shopsDataService: ShopsDataService,
    ) {}

    nextInvoiceOrInvoiceTemplate(invoiceOrInvoiceTemplate: InvoiceOrInvoiceTemplate): Subscription {
        return (
            invoiceOrInvoiceTemplate.type === Type.Invoice
                ? this.invoicesService.getInvoicePaymentMethods({
                      invoiceID: invoiceOrInvoiceTemplate.invoiceOrInvoiceTemplate.id,
                  })
                : this.invoiceTemplatesService.getInvoicePaymentMethodsByTemplateID({
                      invoiceTemplateID:
                          invoiceOrInvoiceTemplate.invoiceOrInvoiceTemplate.invoiceTemplate.id,
                  })
        )
            .pipe(progressTo(this.progress$))
            .subscribe((paymentMethods) => {
                this.paymentMethods$.next(paymentMethods);
                this.currentStep$.next(Step.PaymentLink);
                this.invoiceOrInvoiceTemplate = invoiceOrInvoiceTemplate;
            });
    }

    create(): void {
        this.create$.next();
    }
}
