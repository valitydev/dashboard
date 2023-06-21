import { Injectable, Injector } from '@angular/core';
import { ApiKeysService as ApiService } from '@vality/swag-api-keys';

import { createApi } from '../utils';
import { PartyIdExtension, PartyIdPatchMethodService } from '../utils/extensions';

@Injectable({
    providedIn: 'root',
})
export class ApiKeysService extends createApi(ApiService, [PartyIdExtension]) {
    constructor(injector: Injector, private partyIdPatchMethodService: PartyIdPatchMethodService) {
        super(injector);
        this.requestRevokeApiKey = this.partyIdPatchMethodService.patch(
            this.requestRevokeApiKey,
            (params, partyId) => (params.partyId = partyId)
        );
    }
}
