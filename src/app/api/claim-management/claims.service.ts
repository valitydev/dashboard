import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClaimsService as ApiClaimsService } from '@vality/swag-claim-management';
import { throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { createApi, ApiMethodParams } from '../utils';
import { PartyIdExtension } from '../utils/extensions';

@Injectable({
    providedIn: 'root',
})
export class ClaimsService extends createApi(ApiClaimsService, [PartyIdExtension]) {
    requestReviewClaimByIDWithRevisionCheck = (
        params: ApiMethodParams<
            ApiClaimsService['requestReviewClaimByID'],
            'xRequestID' | 'partyID'
        >,
    ) => {
        return this.requestReviewClaimByID(params).pipe(
            catchError((err) => {
                if (
                    err instanceof HttpErrorResponse &&
                    err.error?.code === 'invalidClaimRevision'
                ) {
                    return this.getClaimByID({ claimID: params.claimID }).pipe(
                        switchMap((claim) =>
                            this.requestReviewClaimByID({
                                ...params,
                                claimRevision: claim.revision,
                            }),
                        ),
                    );
                }
                return throwError(err);
            }),
        );
    };
}
