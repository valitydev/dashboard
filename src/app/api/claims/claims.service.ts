import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { first, switchMap, catchError } from 'rxjs/operators';

import {
    Claim,
    ClaimsService as APIClaimsService,
    Modification,
    Reason,
    StatusModificationUnit,
} from '@dsh/api-codegen/claim-management';
import { IdGeneratorService, KeycloakTokenInfoService } from '@dsh/app/shared';
import { mapResult, noContinuationToken } from '@dsh/operators';

@Injectable()
export class ClaimsService {
    constructor(
        private claimsService: APIClaimsService,
        private idGenerator: IdGeneratorService,
        private keycloakTokenInfoService: KeycloakTokenInfoService
    ) {}

    searchClaims(
        limit: number,
        claimStatuses?: StatusModificationUnit.StatusEnum[],
        claimID?: number,
        continuationToken?: string
    ) {
        return this.keycloakTokenInfoService.partyID$.pipe(
            first(),
            switchMap((partyID) =>
                this.claimsService.searchClaims(
                    this.idGenerator.shortUuid(),
                    partyID,
                    limit,
                    undefined,
                    continuationToken,
                    claimID,
                    claimStatuses || Object.values(StatusModificationUnit.StatusEnum)
                )
            )
        );
    }

    search1000Claims(claimStatuses?: StatusModificationUnit.StatusEnum[]): Observable<Claim[]> {
        return this.searchClaims(1000, claimStatuses).pipe(noContinuationToken, mapResult);
    }

    getClaimByID(claimID: number): Observable<Claim> {
        return this.keycloakTokenInfoService.partyID$.pipe(
            first(),
            switchMap((partyID) => this.claimsService.getClaimByID(this.idGenerator.shortUuid(), partyID, claimID))
        );
    }

    createClaim(changeset: Modification[]): Observable<Claim> {
        return this.keycloakTokenInfoService.partyID$.pipe(
            first(),
            switchMap((partyId) => this.claimsService.createClaim(this.idGenerator.shortUuid(), partyId, changeset))
        );
    }

    updateClaimByID(claimID: number, claimRevision: number, changeset: Modification[]): Observable<void> {
        return this.keycloakTokenInfoService.partyID$.pipe(
            first(),
            switchMap((partyId) =>
                this.claimsService.updateClaimByID(
                    this.idGenerator.shortUuid(),
                    partyId,
                    claimID,
                    claimRevision,
                    changeset
                )
            )
        );
    }

    revokeClaimByID(claimID: number, claimRevision: number, reason: Reason): Observable<void> {
        return this.keycloakTokenInfoService.partyID$.pipe(
            first(),
            switchMap((partyId) =>
                this.claimsService.revokeClaimByID(
                    this.idGenerator.shortUuid(),
                    partyId,
                    claimID,
                    claimRevision,
                    undefined,
                    reason
                )
            )
        );
    }

    requestReviewClaimByID(claimID: number, claimRevision: number): Observable<void> {
        return this.keycloakTokenInfoService.partyID$.pipe(
            first(),
            switchMap((partyId) =>
                this.claimsService
                    .requestReviewClaimByID(this.idGenerator.shortUuid(), partyId, claimID, claimRevision)
                    .pipe(
                        catchError((err) => {
                            if (err instanceof HttpErrorResponse && err.error?.code === 'invalidClaimRevision')
                                return this.getClaimByID(claimID).pipe(
                                    switchMap((claim) =>
                                        this.claimsService.requestReviewClaimByID(
                                            this.idGenerator.shortUuid(),
                                            partyId,
                                            claim.id,
                                            claim.revision
                                        )
                                    )
                                );
                            return throwError(err);
                        })
                    )
            )
        );
    }
}
