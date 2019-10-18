import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import {
    ClaimsService as APIClaimsService,
    Claim,
    StatusModificationUnit,
    ClaimChangeset
} from '../../api-codegen/claim-management';
import { ClaimsWithToken } from './models';
import { genXRequestID } from '../utils';
import { noContinuationToken, mapResult } from '../../custom-operators';

export const ClaimStatus = StatusModificationUnit.StatusEnum;

@Injectable()
export class ClaimsService {
    constructor(private claimsService: APIClaimsService) {}

    searchClaims(
        limit: number,
        continuationToken?: string,
        claimStatuses?: StatusModificationUnit.StatusEnum[]
    ): Observable<ClaimsWithToken> {
        return this.claimsService.searchClaims(genXRequestID(), limit, undefined, continuationToken, claimStatuses);
    }

    search1000Claims(claimStatuses?: StatusModificationUnit.StatusEnum[], cacheSize = 1): Observable<Claim[]> {
        return this.searchClaims(1000, null, claimStatuses).pipe(
            noContinuationToken,
            mapResult,
            shareReplay(cacheSize)
        );
    }

    getClaimByID(claimID: number): Observable<Claim> {
        return this.claimsService.getClaimByID(genXRequestID(), claimID);
    }

    createClaim(claimChangeset: ClaimChangeset): Observable<Claim> {
        return this.claimsService.createClaim(genXRequestID(), claimChangeset);
    }
}