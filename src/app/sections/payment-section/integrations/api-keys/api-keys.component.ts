import { Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DialogService } from '@vality/ng-core';
import { ApiKeyStatus, ListApiKeysRequestParams } from '@vality/swag-api-keys-v2';
import { Observable } from 'rxjs';

import { mapToTimestamp, shareReplayRefCount } from '@dsh/app/custom-operators';
import { QueryParamsService } from '@dsh/app/shared';

import { ApiKeysExpandedIdManager } from './api-keys-expanded-id-manager.service';
import { ApiKeyCreateDialogComponent } from './components/api-key-create-dialog/api-key-create-dialog.component';
import { FetchApiKeysService } from './fetch-api-keys.service';

@UntilDestroy()
@Component({
    templateUrl: 'api-keys.component.html',
    styleUrls: ['api-keys.component.scss'],
    providers: [ApiKeysExpandedIdManager, FetchApiKeysService],
})
export class ApiKeysComponent {
    showInactive = this.qp.params.showInactive;
    apiKeys$ = this.fetchApiKeysService.result$;
    isLoading$ = this.fetchApiKeysService.isLoading$;
    hasMore$ = this.fetchApiKeysService.hasMore$;
    expandedId$ = this.apiKeysExpandedIdManager.expandedId$;
    lastUpdated$: Observable<string> = this.fetchApiKeysService.result$.pipe(mapToTimestamp, shareReplayRefCount());

    constructor(
        private qp: QueryParamsService<{ showInactive: boolean }>,
        private apiKeysExpandedIdManager: ApiKeysExpandedIdManager,
        private fetchApiKeysService: FetchApiKeysService,
        private dialogService: DialogService
    ) {}

    update(params: Omit<ListApiKeysRequestParams, 'partyId' | 'xRequestID' | 'limit'> = {}) {
        this.fetchApiKeysService.load(Object.assign(params, !this.showInactive && { status: ApiKeyStatus.Active }));
    }

    more() {
        this.fetchApiKeysService.more();
    }

    create() {
        this.dialogService
            .open(ApiKeyCreateDialogComponent)
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(() => {
                this.update();
            });
    }

    toggle() {
        this.showInactive = !this.showInactive;
        void this.qp.set({ showInactive: this.showInactive });
        this.update();
    }

    expandedIdChange(id: number) {
        this.apiKeysExpandedIdManager.expandedIdChange(id);
    }
}
