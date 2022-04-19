import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { switchMap, pluck } from 'rxjs/operators';

import { ClaimsService } from '@dsh/api/claim-management';
import { progressTo, inProgressFrom } from '@dsh/utils';

@Injectable()
export class RouteParamClaimService {
    claim$ = this.route.params.pipe(
        pluck('claimId'),
        switchMap((claimID) => this.claimsService.getClaimByID({ claimID }).pipe(progressTo(this.progress$)))
    );
    isLoading$ = inProgressFrom(() => this.progress$, this.claim$);

    private progress$ = new BehaviorSubject(0);

    constructor(private route: ActivatedRoute, private claimsService: ClaimsService) {}
}
