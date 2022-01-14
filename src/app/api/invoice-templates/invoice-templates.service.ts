import { Injectable } from '@angular/core';

import {
    InvoiceTemplateCreateParams,
    InvoiceTemplatesService as InvoiceTemplatesApiService,
} from '@dsh/api-codegen/capi';
import { IdGeneratorService } from '@dsh/app/shared';

@Injectable()
export class InvoiceTemplatesService {
    constructor(private invoiceTemplatesService: InvoiceTemplatesApiService, private idGenerator: IdGeneratorService) {}

    createInvoiceTemplate(params: InvoiceTemplateCreateParams) {
        return this.invoiceTemplatesService.createInvoiceTemplate(this.idGenerator.shortUuid(), params);
    }

    getInvoicePaymentMethodsByTemplateID(invoiceTemplateID: string) {
        return this.invoiceTemplatesService.getInvoicePaymentMethodsByTemplateID(
            this.idGenerator.shortUuid(),
            invoiceTemplateID
        );
    }
}
