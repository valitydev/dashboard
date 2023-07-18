import { Injectable, Injector } from '@angular/core';
import { ApiKeysService as ApiService } from '@vality/swag-api-keys-v2';

import { createApi } from '../utils';
import { PartyIdExtension, PartyIdPatchMethodService } from '../utils/extensions';

@Injectable({
    providedIn: 'root',
})
export class ApiKeysService extends createApi(ApiService, [PartyIdExtension]) {
    constructor(injector: Injector, partyIdPatchMethodService: PartyIdPatchMethodService) {
        super(injector);
        this.requestRevokeApiKey = partyIdPatchMethodService.patch(
            this.requestRevokeApiKey,
            (params, partyId) => (params.partyId = partyId)
        );
    }
}
