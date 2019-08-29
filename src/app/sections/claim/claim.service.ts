import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, distinctUntilChanged, switchMap, shareReplay } from 'rxjs/operators';

import { ClaimsService } from '../../claims';
import { getClaimStatusViewInfo } from '../../view-utils';
import { StatusModificationUnit } from '../../api-codegen/claim-management';

@Injectable()
export class ClaimService {
    claim$ = this.route.params.pipe(
        filter(({ id }) => !!id),
        map(({ id }) => Number(id)),
        distinctUntilChanged(),
        switchMap(id => this.claimsService.getClaimByID(id)),
        shareReplay(1)
    );

    claimStatusViewInfo$ = this.claim$.pipe(
        map(({ status }) => getClaimStatusViewInfo(status as StatusModificationUnit.StatusEnum)),
        shareReplay(1)
    );

    constructor(private claimsService: ClaimsService, private route: ActivatedRoute) {}
}