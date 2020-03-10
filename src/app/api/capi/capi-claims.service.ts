import { Injectable } from '@angular/core';

import { ClaimsService, ClaimChangeset } from '../../api-codegen/capi';
import { genXRequestID } from '../utils';

@Injectable()
export class CAPIClaimsService {
    constructor(private claimsService: ClaimsService) {}

    createClaim(claimChangeset: ClaimChangeset) {
        return this.claimsService.createClaim(genXRequestID(), claimChangeset);
    }
}