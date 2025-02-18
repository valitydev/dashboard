import { Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { FetchSuperclass, NotifyLogService, FetchResult, FetchOptions } from '@vality/matez';
import { ListApiKeysRequestParams, ApiKey } from '@vality/swag-api-keys-v2';
import { of, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ApiKeysService } from '@dsh/app/api/api-keys';

@Injectable()
export class FetchApiKeysService extends FetchSuperclass<
    ApiKey,
    Omit<ListApiKeysRequestParams, 'partyId' | 'xRequestID' | 'limit'>
> {
    constructor(
        private apiKeysService: ApiKeysService,
        private log: NotifyLogService,
        private transloco: TranslocoService,
    ) {
        super();
    }

    protected fetch(
        params: Omit<ListApiKeysRequestParams, 'partyId' | 'xRequestID' | 'limit'>,
        options: FetchOptions,
    ): Observable<FetchResult<ApiKey>> {
        return this.apiKeysService
            .listApiKeys({
                ...params,
                limit: options.size,
                continuationToken: options.continuationToken,
            })
            .pipe(
                map((res) => ({
                    result: res.results,
                    continuationToken: res.continuationToken,
                })),
                catchError((err) => {
                    this.log.error(
                        err,
                        this.transloco.selectTranslate(
                            'apiKeys.fetch.error',
                            {},
                            'payment-section',
                        ),
                    );
                    return of({
                        result: [],
                    });
                }),
            );
    }
}
