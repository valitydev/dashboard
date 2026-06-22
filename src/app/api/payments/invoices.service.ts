import { Injectable, Injector } from '@angular/core';
import { PartyIdPatchMethodService } from '@dsh/app/api/utils/extensions';

import { InvoicesService as ApiInvoicesService } from '@vality/swag-payments';

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
