import { Injectable } from '@angular/core';
import { Shop } from '@vality/swag-payments';
import { Observable, Subject, defer, merge, of } from 'rxjs';
import { catchError, map, shareReplay, switchMap } from 'rxjs/operators';

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
        shareReplay({ refCount: true, bufferSize: 1 }),
    );

    constructor(
        private shopsService: ShopsService,
        private contextOrganizationService: ContextOrganizationService,
        private idGenerator: IdGeneratorService,
    ) {}

    reloadShops() {
        this.reloadShops$.next();
    }
}
