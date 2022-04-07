import { Injectable } from '@angular/core';
import { Invoice, InvoiceTemplateAndToken } from '@vality/swag-payments';
import moment from 'moment';
import { Observable } from 'rxjs';
import { pluck, switchMap } from 'rxjs/operators';

import { InvoicesService } from '@dsh/api/payments';
import { UrlShortenerService } from '@dsh/api/url-shortener';
import { queryParamsToStr } from '@dsh/utils';

import { ConfigService } from '../../../config';
import { PaymentLinkParams } from './types/payment-link-params';
import { getDueDate } from './utils/get-due-date';

@Injectable({
    providedIn: 'root',
})
export class CreatePaymentLinkService {
    constructor(
        private urlShortenerService: UrlShortenerService,
        private configService: ConfigService,
        private invoicesService: InvoicesService
    ) {}

    createPaymentLinkByTemplate(
        { invoiceTemplate, invoiceTemplateAccessToken }: InvoiceTemplateAndToken,
        params: PaymentLinkParams
    ): Observable<string> {
        return this.urlShortenerService
            .shortenUrl(
                this.buildUrl({
                    ...params,
                    invoiceTemplateID: invoiceTemplate.id,
                    invoiceTemplateAccessToken: invoiceTemplateAccessToken.payload,
                }),
                getDueDate(invoiceTemplate.lifetime).utc().format()
            )
            .pipe(pluck('shortenedUrl'));
    }

    createPaymentLinkByInvoice(invoice: Invoice, params: PaymentLinkParams): Observable<string> {
        return this.invoicesService.createInvoiceAccessToken({ invoiceID: invoice.id }).pipe(
            switchMap(({ payload: invoiceAccessToken }) =>
                this.urlShortenerService.shortenUrl(
                    this.buildUrl({
                        ...params,
                        invoiceID: invoice.id,
                        invoiceAccessToken,
                    }),
                    moment(invoice.dueDate).utc().format()
                )
            ),
            pluck('shortenedUrl')
        );
    }

    private buildUrl(params: PaymentLinkParams): string {
        return `${this.configService.checkoutEndpoint}/v1/checkout.html?${queryParamsToStr(params)}`;
    }
}
