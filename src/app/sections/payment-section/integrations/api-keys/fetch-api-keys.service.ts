import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { FetchSuperclass, NotifyLogService, FetchResult, FetchOptions } from '@vality/ng-core';
import { ListApiKeysRequestParams } from '@vality/swag-api-keys-v2';
import { ApiKey } from '@vality/swag-api-keys-v2/lib/model/api-key';
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
        private logService: NotifyLogService,
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
                    this.logService.error(
                        err,
                        this.transloco.translate('apiKeys.fetch.error', {}, 'payment-section'),
                    );
                    return of({
                        result: [],
                    });
                }),
            );
    }
}
