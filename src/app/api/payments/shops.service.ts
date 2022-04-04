import { Injectable } from '@angular/core';
import { ShopsService as ApiShopsService, Shop } from '@vality/swag-payments';
import { defer, Observable, Subject } from 'rxjs';
import { startWith, switchMapTo } from 'rxjs/operators';

import { IdGeneratorService } from '@dsh/app/shared';
import { shareReplayRefCount } from '@dsh/operators';

import { createDefaultHeaders } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class ShopsService {
    shops$: Observable<Shop[]> = defer(() => this.reloadShops$).pipe(
        startWith(null),
        switchMapTo(this.getShops()),
        shareReplayRefCount()
    );

    private reloadShops$ = new Subject<void>();

    constructor(private shopsService: ApiShopsService, private idGenerator: IdGeneratorService) {
        this.shopsService.defaultHeaders = createDefaultHeaders();
    }

    getShopByID(shopID: string) {
        return this.shopsService.getShopByID({ xRequestID: this.idGenerator.shortUuid(), shopID });
    }

    getShops() {
        return this.shopsService.getShops({ xRequestID: this.idGenerator.shortUuid() });
    }

    reloadShops(): void {
        this.reloadShops$.next();
    }

    suspendShop(shopID: string): Observable<void> {
        return this.shopsService.suspendShop({ xRequestID: this.idGenerator.shortUuid(), shopID });
    }

    activateShop(shopID: string): Observable<void> {
        return this.shopsService.activateShop({ xRequestID: this.idGenerator.shortUuid(), shopID });
    }
}
