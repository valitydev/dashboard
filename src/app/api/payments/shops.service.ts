import { Injectable, Injector } from '@angular/core';
import { ShopsService as ApiShopsService, Shop } from '@vality/swag-payments';
import { defer, Observable, Subject, combineLatest } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

import { ContextService } from '@dsh/app/shared';
import { shareReplayRefCount } from '@dsh/operators';

import { createApi } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class ShopsService extends createApi(ApiShopsService) {
    shops$: Observable<Shop[]> = combineLatest([
        this.contextService.organization$,
        defer(() => this.reloadShops$).pipe(startWith(null)),
    ]).pipe(
        switchMap(([{ party }]) => this.getShopsForParty({ partyID: party })),
        shareReplayRefCount()
    );

    private reloadShops$ = new Subject<void>();

    constructor(injector: Injector, private contextService: ContextService) {
        super(injector);
    }

    reloadShops(): void {
        this.reloadShops$.next();
    }
}
