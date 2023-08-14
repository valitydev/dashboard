import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { PaymentMethod } from '@vality/swag-payments';
import {
    BehaviorSubject,
    defer,
    merge,
    ReplaySubject,
    Subject,
    Subscription,
    tap,
    EMPTY,
} from 'rxjs';
import { mapTo, shareReplay, switchMap, catchError, switchMapTo } from 'rxjs/operators';

import { InvoicesService, InvoiceTemplatesService } from '@dsh/app/api/payments';
import { NotificationService, ErrorService } from '@dsh/app/shared';
import { CreatePaymentLinkService } from '@dsh/app/shared/services/create-payment-link';
import { progressTo } from '@dsh/utils';

import {
    CreateInvoiceOrInvoiceTemplateService,
    InvoiceOrInvoiceTemplate,
    Type,
} from './create-invoice-or-invoice-template';

enum Step {
    InvoiceTemplate,
    PaymentLink,
}

@Component({
    selector: 'dsh-payment-link',
    templateUrl: 'payment-link.component.html',
    styleUrls: ['payment-link.component.scss'],
    providers: [CreateInvoiceOrInvoiceTemplateService],
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
                        this.errorService.error(err, false);
                        return this.transloco
                            .selectTranslate(
                                'paymentLink.errors.createPaymentLinkError',
                                null,
                                'payment-section',
                            )
                            .pipe(
                                tap((message) => this.notificationService.error(message)),
                                switchMapTo(EMPTY),
                            );
                    }),
                ),
            ),
        ),
        this.formControl.valueChanges.pipe(mapTo('')),
    ).pipe(shareReplay(1));
    progress$ = new BehaviorSubject(0);

    private create$ = new Subject<void>();

    constructor(
        private invoicesService: InvoicesService,
        private invoiceTemplatesService: InvoiceTemplatesService,
        private createPaymentLinkService: CreatePaymentLinkService,
        private notificationService: NotificationService,
        private errorService: ErrorService,
        private transloco: TranslocoService,
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
