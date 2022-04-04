import { Injectable } from '@angular/core';
import {
    InvoiceTemplateCreateParams,
    InvoiceTemplatesService as ApiInvoiceTemplatesService,
} from '@vality/swag-payments';

import { IdGeneratorService } from '@dsh/app/shared';

import { createDefaultHeaders } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class InvoiceTemplatesService {
    constructor(private invoiceTemplatesService: ApiInvoiceTemplatesService, private idGenerator: IdGeneratorService) {
        this.invoiceTemplatesService.defaultHeaders = createDefaultHeaders();
    }

    createInvoiceTemplate(invoiceTemplateCreateParams: InvoiceTemplateCreateParams) {
        return this.invoiceTemplatesService.createInvoiceTemplate({
            xRequestID: this.idGenerator.shortUuid(),
            invoiceTemplateCreateParams,
        });
    }

    getInvoicePaymentMethodsByTemplateID(invoiceTemplateID: string) {
        return this.invoiceTemplatesService.getInvoicePaymentMethodsByTemplateID({
            xRequestID: this.idGenerator.shortUuid(),
            invoiceTemplateID,
        });
    }
}
