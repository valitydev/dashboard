import { Injectable } from '@angular/core';
import { ListApiKeysRequestParams } from '@vality/swag-api-keys';
import { BehaviorSubject, Observable, defer, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ApiKeysService } from '@dsh/api/api-keys';
import { ErrorService } from '@dsh/app/shared/services';
import { mapToTimestamp, shareReplayRefCount } from '@dsh/operators';
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
    private fetchApiKeys$ = new BehaviorSubject<Omit<ListApiKeysRequestParams, 'partyId'>>({});

    constructor(private apiKeysService: ApiKeysService, private errorService: ErrorService) {}

    update(params: Omit<ListApiKeysRequestParams, 'partyId'> = {}) {
        this.fetchApiKeys$.next(params);
    }
}
