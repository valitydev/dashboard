import { Injectable } from '@angular/core';
import { IdentitiesService as ApiIdentitiesService, Identity } from '@vality/swag-wallet';
import { Subject, defer, switchMap } from 'rxjs';
import { map, shareReplay, startWith } from 'rxjs/operators';

import { PartyIdExtension } from '@dsh/app/api/utils/extensions';

import { createApi } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class IdentitiesService extends createApi(ApiIdentitiesService, [PartyIdExtension]) {
    identities$ = defer(() => this.reloadIdentities$).pipe(
        startWith<void>(undefined),
        switchMap(() => this.listIdentities()),
        map((r) => r.result as Identity[]),
        shareReplay({ refCount: true, bufferSize: 1 }),
    );

    private reloadIdentities$ = new Subject<void>();

    reloadIdentities() {
        this.reloadIdentities$.next();
    }
}
