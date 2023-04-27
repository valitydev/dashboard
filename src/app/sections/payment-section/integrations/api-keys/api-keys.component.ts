import { Component } from '@angular/core';
import { ApiKeyStatus, ListApiKeysRequestParams } from '@vality/swag-api-keys';
import { BehaviorSubject, catchError, defer, map, of, switchMap } from 'rxjs';

import { ApiKeysService } from '@dsh/api/api-keys';
import { ConfigService } from '@dsh/app/config';
import { inProgressFrom, progressTo } from '@dsh/utils';

import { shareReplayRefCount } from '../../../../custom-operators';
import { ErrorService, QueryParamsService } from '../../../../shared';

@Component({
    templateUrl: 'api-keys.component.html',
    styleUrls: ['api-keys.component.scss'],
})
export class ApiKeysComponent {
    showInactive = this.qp.params.showInactive;
    paymentsApiSpecEndpoint = this.configService.docsEndpoints.payments;
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

    private progress$ = new BehaviorSubject(0);
    private fetchApiKeys$ = new BehaviorSubject<Omit<ListApiKeysRequestParams, 'partyId'>>({});

    constructor(
        private configService: ConfigService,
        private errorService: ErrorService,
        private apiKeysService: ApiKeysService,
        private qp: QueryParamsService<{ showInactive: boolean }>
    ) {}

    update(params: Omit<ListApiKeysRequestParams, 'partyId'> = {}) {
        this.fetchApiKeys$.next(Object.assign(params, !this.showInactive && { status: ApiKeyStatus.Active }));
    }

    create() {
        throw new Error('Method not implemented.');
    }

    toggle() {
        this.showInactive = !this.showInactive;
        void this.qp.set({ showInactive: this.showInactive });
        this.update();
    }
}
