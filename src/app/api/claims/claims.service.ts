import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClaimsService as ApiClaimsService, Modification } from '@vality/swag-claim-management';
import { Observable, throwError } from 'rxjs';
import { first, switchMap, catchError } from 'rxjs/operators';

import { IdGeneratorService, KeycloakTokenInfoService } from '@dsh/app/shared';

import { ApiMethodParams } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class ClaimsService {
    constructor(
        private claimsService: ApiClaimsService,
        private idGenerator: IdGeneratorService,
        private keycloakTokenInfoService: KeycloakTokenInfoService
    ) {
        this.claimsService.defaultHeaders = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    }

    searchClaims(params: ApiMethodParams<ApiClaimsService['searchClaims'], 'xRequestID' | 'partyID'>) {
        return this.keycloakTokenInfoService.partyID$.pipe(
            first(),
            switchMap((partyID) =>
                this.claimsService.searchClaims({
                    xRequestID: this.idGenerator.shortUuid(),
                    partyID,
                    ...params,
                })
            )
        );
    }

    getClaimByID(claimID: number) {
        return this.keycloakTokenInfoService.partyID$.pipe(
            first(),
            switchMap((partyID) =>
                this.claimsService.getClaimByID({ xRequestID: this.idGenerator.shortUuid(), partyID, claimID })
            )
        );
    }

    createClaim(changeset: Modification[]) {
        return this.keycloakTokenInfoService.partyID$.pipe(
            first(),
            switchMap((partyID) =>
                this.claimsService.createClaim({ xRequestID: this.idGenerator.shortUuid(), partyID, changeset })
            )
        );
    }

    updateClaimByID(
        params: ApiMethodParams<ApiClaimsService['updateClaimByID'], 'xRequestID' | 'partyID'>
    ): Observable<void> {
        return this.keycloakTokenInfoService.partyID$.pipe(
            first(),
            switchMap((partyID) =>
                this.claimsService.updateClaimByID({
                    xRequestID: this.idGenerator.shortUuid(),
                    partyID,
                    ...params,
                })
            )
        );
    }

    revokeClaimByID(params: ApiMethodParams<ApiClaimsService['revokeClaimByID'], 'xRequestID' | 'partyID'>) {
        return this.keycloakTokenInfoService.partyID$.pipe(
            first(),
            switchMap((partyID) =>
                this.claimsService.revokeClaimByID({
                    xRequestID: this.idGenerator.shortUuid(),
                    partyID,
                    ...params,
                })
            )
        );
    }

    requestReviewClaimByID(
        params: ApiMethodParams<ApiClaimsService['requestReviewClaimByID'], 'xRequestID' | 'partyID'>
    ) {
        return this.keycloakTokenInfoService.partyID$.pipe(
            first(),
            switchMap((partyID) =>
                this.claimsService
                    .requestReviewClaimByID({
                        xRequestID: this.idGenerator.shortUuid(),
                        partyID,
                        ...params,
                    })
                    .pipe(
                        catchError((err) => {
                            if (err instanceof HttpErrorResponse && err.error?.code === 'invalidClaimRevision')
                                return this.getClaimByID(params.claimID).pipe(
                                    switchMap((claim) =>
                                        this.claimsService.requestReviewClaimByID({
                                            xRequestID: this.idGenerator.shortUuid(),
                                            partyID,
                                            claimID: claim.id,
                                            claimRevision: claim.revision,
                                        })
                                    )
                                );
                            return throwError(err);
                        })
                    )
            )
        );
    }
}
