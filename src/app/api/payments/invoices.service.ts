import { Injectable, Injector } from '@angular/core';
import { InvoicesService as ApiInvoicesService } from '@vality/swag-payments';

import { PartyIdPatchMethodService } from '@dsh/app/api/utils/extensions';

import { createApi } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class InvoicesService extends createApi(ApiInvoicesService) {
    constructor(injector: Injector, partyIdPatchMethodService: PartyIdPatchMethodService) {
        super(injector);
        this.createInvoice = partyIdPatchMethodService.patch(
            this.createInvoice,
            (p, id) => (p.invoiceParams.partyID = id),
        );
    }
}
