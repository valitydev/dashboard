import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClaimsService as ApiClaimsService } from '@vality/swag-claim-management';
import { throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { createApi, PartyIdExtension, ApiMethodParams } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class ClaimsService extends createApi(ApiClaimsService, [PartyIdExtension]) {
    requestReviewClaimByID = (
        params: ApiMethodParams<ApiClaimsService['requestReviewClaimByID'], 'xRequestID' | 'partyID'>
    ) => {
        return super.requestReviewClaimByID(params).pipe(
            catchError((err) => {
                if (err instanceof HttpErrorResponse && err.error?.code === 'invalidClaimRevision')
                    return this.getClaimByID({ claimID: params.claimID }).pipe(
                        switchMap((claim) =>
                            super.requestReviewClaimByID({
                                ...params,
                                claimRevision: claim.revision,
                            })
                        )
                    );
                return throwError(err);
            })
        );
    };
}
