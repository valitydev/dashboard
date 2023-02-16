import { Injectable } from '@angular/core';
import { Shop } from '@vality/swag-payments';
import { Observable, Subject, of, repeat } from 'rxjs';
import { startWith, switchMap, takeWhile } from 'rxjs/operators';

import { createTestShopClaimChangeset, ClaimsService } from '@dsh/api/claim-management';
import { ShopsService } from '@dsh/api/payments';
import { ContextOrganizationService } from '@dsh/app/shared';
import { shareReplayRefCount } from '@dsh/operators';

import { IdGeneratorService } from '../id-generator';

@Injectable({
    providedIn: 'root',
})
export class ShopsDataService {
    shops$: Observable<Shop[]> = this.contextOrganizationService.organization$.pipe(
        switchMap(() => this.reloadShops$),
        startWith(this.shopsService.getShopsForParty()),
        switchMap((shops$) => shops$),
        switchMap((shops) => (shops.length ? of(shops) : this.createTestShop())),
        shareReplayRefCount()
    );

    private reloadShops$ = new Subject<Observable<Shop[]>>();

    constructor(
        private shopsService: ShopsService,
        private contextOrganizationService: ContextOrganizationService,
        private idGenerator: IdGeneratorService,
        private claimsService: ClaimsService
    ) {}

    reloadShops(): Observable<Shop[]> {
        const shop$ = this.shopsService.getShopsForParty();
        this.reloadShops$.next(shop$);
        return shop$;
    }

    private createTestShop(): Observable<Shop[]> {
        return this.claimsService
            .searchClaims({ limit: 1 })
            .pipe(
                switchMap((claims) =>
                    claims.result.length
                        ? of(claims.result[0])
                        : this.claimsService.createClaim({
                              changeset: createTestShopClaimChangeset(
                                  this.idGenerator.uuid(),
                                  this.idGenerator.uuid(),
                                  this.idGenerator.uuid(),
                                  this.idGenerator.uuid()
                              ),
                          })
                )
            )
            .pipe(
                switchMap(() => this.shopsService.getShopsForParty()),
                repeat({ count: 2, delay: 1000 }),
                takeWhile((shops) => !shops.length)
            );
    }
}
