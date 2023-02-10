import { Injectable, Injector } from '@angular/core';
import { ShopsService as ApiShopsService, Shop } from '@vality/swag-payments';
import { defer, Observable, Subject } from 'rxjs';
import { startWith, switchMap, first, share } from 'rxjs/operators';

import { ContextOrganizationService } from '@dsh/app/shared';
import { shareReplayRefCount } from '@dsh/operators';

import { createApi } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class ShopsService extends createApi(ApiShopsService) {
    shops$: Observable<Shop[]> = defer(() => this.reloadShops$).pipe(
        startWith(this.fetchShops()),
        switchMap((shops$) => shops$),
        shareReplayRefCount()
    );

    private reloadShops$ = new Subject<Observable<Shop[]>>();

    constructor(injector: Injector, private contextOrganizationService: ContextOrganizationService) {
        super(injector);
    }

    reloadShops(): Observable<Shop[]> {
        const shop$ = this.fetchShops();
        this.reloadShops$.next(shop$);
        return shop$;
    }

    private fetchShops() {
        return this.contextOrganizationService.organization$.pipe(
            first(),
            switchMap(({ party }) => this.getShopsForParty({ partyID: party })),
            share()
        );
    }
}
