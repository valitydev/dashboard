import { Injectable, Injector } from '@angular/core';
import { PayoutsService as ApiPayoutsService } from '@vality/swag-payments';

import { PartyIdExtension, PartyIdPatchMethodService } from '@dsh/app/api/utils/extensions';

import { createApi } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class PayoutsService extends createApi(ApiPayoutsService, [PartyIdExtension]) {
    constructor(
        injector: Injector,
        private partyIdPatchMethodService: PartyIdPatchMethodService,
    ) {
        super(injector);
        this.createPayout = partyIdPatchMethodService.patch(
            this.createPayout,
            (params, partyId) => (params.payoutParams.partyID = partyId),
        );
    }
}
