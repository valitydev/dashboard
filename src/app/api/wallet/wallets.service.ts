import { Injectable, Injector } from '@angular/core';
import { WalletsService as ApiWalletsService, Wallet } from '@vality/swag-wallets';
import { Observable, of, switchMap } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';

import { ContextOrganizationService } from '@dsh/app/shared';

import { createApi } from '../utils';
import { PartyIdExtension } from '../utils/extensions';

@Injectable({
    providedIn: 'root',
})
export class WalletsService extends createApi(ApiWalletsService, [PartyIdExtension]) {
    wallets$: Observable<Wallet[]> = this.contextOrganizationService.organization$.pipe(
        switchMap(() =>
            this.listWallets({ limit: 1000 }).pipe(
                map((v) => v.result),
                catchError(() => of([])),
            ),
        ),
        shareReplay({ refCount: true, bufferSize: 1 }),
    );

    constructor(
        injector: Injector,
        private contextOrganizationService: ContextOrganizationService,
    ) {
        super(injector);
    }
}
