import { Injectable } from '@angular/core';
import { Shop } from '@vality/swag-payments';
import { Observable, Subject, defer, first, merge, of, repeat } from 'rxjs';
import { catchError, filter, map, shareReplay, switchMap } from 'rxjs/operators';

import { ClaimsService, createTestShopClaimChangeset } from '@dsh/app/api/claim-management';
import { ShopsService } from '@dsh/app/api/payments';
import { ContextOrganizationService } from '@dsh/app/shared';

import { IdGeneratorService } from '../id-generator';

@Injectable({
    providedIn: 'root',
})
export class ShopsDataService {
    shops$: Observable<Shop[]> = defer(() => this.shopsData$).pipe(
        map((s) => (s ? s : [])),
        shareReplay({ refCount: true, bufferSize: 1 }),
    );
    shopsAllowed$ = defer(() => this.shopsData$).pipe(
        map(Boolean),
        shareReplay({ refCount: true, bufferSize: 1 }),
    );

    private reloadShops$ = new Subject<void>();
    private shopsData$: Observable<Shop[] | null> = merge(
        this.contextOrganizationService.organization$,
        defer(() => this.reloadShops$),
    ).pipe(
        switchMap(() =>
            this.shopsService.getShopsForParty().pipe(
                catchError((error) => {
                    if (error?.status == 401) {
                        return of(null);
                    }
                    throw error;
                }),
            ),
        ),
        switchMap((shops) =>
            shops ? (shops.length ? of(shops) : this.createTestShop()) : of(null),
        ),
        shareReplay({ refCount: true, bufferSize: 1 }),
    );

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
