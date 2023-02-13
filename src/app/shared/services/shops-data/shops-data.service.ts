import { Injectable } from '@angular/core';
import { Shop } from '@vality/swag-payments';
import { defer, Observable, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

import { ShopsService } from '@dsh/api/payments';
import { shareReplayRefCount } from '@dsh/operators';

@Injectable({
    providedIn: 'root',
})
export class ShopsDataService {
    shops$: Observable<Shop[]> = defer(() => this.reloadShops$).pipe(
        startWith(this.shopsService.getShopsForParty()),
        switchMap((shops$) => shops$),
        shareReplayRefCount()
    );

    private reloadShops$ = new Subject<Observable<Shop[]>>();

    constructor(private shopsService: ShopsService) {}

    reloadShops(): Observable<Shop[]> {
        const shop$ = this.shopsService.getShopsForParty();
        this.reloadShops$.next(shop$);
        return shop$;
    }
}
