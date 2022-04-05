import { Injectable } from '@angular/core';
import { ShopsService as ApiShopsService, Shop } from '@vality/swag-payments';
import { defer, Observable, Subject } from 'rxjs';
import { startWith, switchMapTo } from 'rxjs/operators';

import { shareReplayRefCount } from '@dsh/operators';

import { createApi } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class ShopsService extends createApi(ApiShopsService) {
    shops$: Observable<Shop[]> = defer(() => this.reloadShops$).pipe(
        startWith(null),
        switchMapTo(this.getShops()),
        shareReplayRefCount()
    );

    private reloadShops$ = new Subject<void>();

    reloadShops(): void {
        this.reloadShops$.next();
    }
}
