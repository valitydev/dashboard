import { Injectable, Injector } from '@angular/core';
import { InvoiceTemplatesService as ApiInvoiceTemplatesService } from '@vality/swag-payments';

import { PartyIdPatchMethodService } from '@dsh/app/api/utils/extensions';

import { createApi } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class InvoiceTemplatesService extends createApi(ApiInvoiceTemplatesService) {
    constructor(
        injector: Injector,
        private partyIdPatchMethodService: PartyIdPatchMethodService,
    ) {
        super(injector);
        this.createInvoiceTemplate = this.partyIdPatchMethodService.patch(
            this.createInvoiceTemplate,
            (params, partyId) => (params.invoiceTemplateCreateParams.partyID = partyId),
        );
    }
}
