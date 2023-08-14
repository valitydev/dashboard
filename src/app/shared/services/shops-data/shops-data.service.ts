import { Injectable } from '@angular/core';
import { Shop } from '@vality/swag-payments';
import { Observable, Subject, of, repeat, merge, defer, first } from 'rxjs';
import { switchMap, filter, catchError } from 'rxjs/operators';

import { createTestShopClaimChangeset, ClaimsService } from '@dsh/app/api/claim-management';
import { ShopsService } from '@dsh/app/api/payments';
import { shareReplayRefCount } from '@dsh/app/custom-operators';
import { ContextOrganizationService } from '@dsh/app/shared';

import { IdGeneratorService } from '../id-generator';

@Injectable({
    providedIn: 'root',
})
export class ShopsDataService {
    shops$: Observable<Shop[]> = merge(
        this.contextOrganizationService.organization$,
        defer(() => this.reloadShops$),
    ).pipe(
        switchMap(() => this.shopsService.getShopsForParty()),
        switchMap((shops) => (shops.length ? of(shops) : this.createTestShop())),
        shareReplayRefCount(),
    );

    private reloadShops$ = new Subject<void>();

    constructor(
        private shopsService: ShopsService,
        private contextOrganizationService: ContextOrganizationService,
        private idGenerator: IdGeneratorService,
        private claimsService: ClaimsService,
    ) {}

    reloadShops() {
        this.reloadShops$.next();
    }

    private createTestShop(): Observable<Shop[]> {
        return this.claimsService.searchClaims({ limit: 1 }).pipe(
            switchMap((claims) =>
                claims.result.length
                    ? of(claims.result[0])
                    : this.claimsService.createClaim({
                          changeset: createTestShopClaimChangeset(
                              this.idGenerator.uuid(),
                              this.idGenerator.uuid(),
                              this.idGenerator.uuid(),
                              this.idGenerator.uuid(),
                          ),
                      }),
            ),
            switchMap(() =>
                this.shopsService.getShopsForParty().pipe(repeat({ count: 5, delay: 1000 })),
            ),
            filter((shops) => !!shops.length),
            first(),
            catchError(() => of([])),
        );
    }
}
