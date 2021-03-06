import { Injectable } from '@angular/core';
import { WalletsService as ApiWalletsService } from '@vality/swag-wallet';
import { of } from 'rxjs';
import { catchError, map, pluck, shareReplay } from 'rxjs/operators';

import { SHARE_REPLAY_CONF } from '@dsh/operators';

import { createApi } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class WalletsService extends createApi(ApiWalletsService) {
    wallets$ = this.listWallets({ limit: 1000 }).pipe(
        catchError(() => of({ result: [] })),
        pluck('result'),
        shareReplay(SHARE_REPLAY_CONF)
    );

    hasWallets$ = this.listWallets({ limit: 1 }).pipe(
        catchError(() => of({ result: [] })),
        pluck('result', 'length'),
        map((l) => l > 0),
        shareReplay(SHARE_REPLAY_CONF)
    );
}
