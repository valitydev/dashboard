import { Injectable } from '@angular/core';
import { IdentitiesService as ApiIdentitiesService } from '@vality/swag-wallet';
import { Subject, defer } from 'rxjs';
import { switchMapTo, pluck, startWith } from 'rxjs/operators';

import { shareReplayRefCount } from '@dsh/operators';

import { createApi } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class IdentitiesService extends createApi(ApiIdentitiesService) {
    identities$ = defer(() => this.reloadIdentities$).pipe(
        startWith<void>(undefined),
        switchMapTo(this.listIdentities()),
        pluck('result'),
        shareReplayRefCount()
    );

    private reloadIdentities$ = new Subject<void>();

    reloadIdentities() {
        this.reloadIdentities$.next();
    }
}
