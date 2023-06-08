import { Injectable } from '@angular/core';
import { ListApiKeysRequestParams } from '@vality/swag-api-keys';
import { BehaviorSubject, Observable, defer, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ApiKeysService } from '@dsh/app/api/api-keys';
import { mapToTimestamp, shareReplayRefCount } from '@dsh/app/custom-operators';
import { ErrorService } from '@dsh/app/shared/services';
import { inProgressFrom, progressTo } from '@dsh/utils';

@Injectable()
export class FetchApiKeysService {
    apiKeys$ = defer(() => this.fetchApiKeys$).pipe(
        switchMap((p) =>
            this.apiKeysService.listApiKeys(p).pipe(
                map((r) => r.results),
                progressTo(() => this.progress$),
                catchError((err) => {
                    this.errorService.error(err);
                    return of([]);
                })
            )
        ),
        shareReplayRefCount()
    );
    isLoading$ = inProgressFrom(() => this.progress$, this.apiKeys$);
    lastUpdated$: Observable<string> = this.apiKeys$.pipe(mapToTimestamp, shareReplayRefCount());

    private progress$ = new BehaviorSubject(0);
    private fetchApiKeys$ = new BehaviorSubject<Omit<ListApiKeysRequestParams, 'partyId' | 'xRequestID'>>({});

    constructor(private apiKeysService: ApiKeysService, private errorService: ErrorService) {}

    update(params: Omit<ListApiKeysRequestParams, 'partyId' | 'xRequestID'> = {}) {
        this.fetchApiKeys$.next(params);
    }
}
