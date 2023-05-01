import { Component } from '@angular/core';
import { ApiKeyStatus, ListApiKeysRequestParams } from '@vality/swag-api-keys';

import { ApiKeysExpandedIdManager } from './api-keys-expanded-id-manager.service';
import { FetchApiKeysService } from './fetch-api-keys.service';
import { QueryParamsService } from '../../../../shared';

@Component({
    templateUrl: 'api-keys.component.html',
    styleUrls: ['api-keys.component.scss'],
    providers: [ApiKeysExpandedIdManager, FetchApiKeysService],
})
export class ApiKeysComponent {
    showInactive = this.qp.params.showInactive;
    apiKeys$ = this.fetchApiKeysService.apiKeys$;
    isLoading$ = this.fetchApiKeysService.isLoading$;
    expandedId$ = this.apiKeysExpandedIdManager.expandedId$;
    lastUpdated$ = this.fetchApiKeysService.lastUpdated$;

    constructor(
        private qp: QueryParamsService<{ showInactive: boolean }>,
        private apiKeysExpandedIdManager: ApiKeysExpandedIdManager,
        private fetchApiKeysService: FetchApiKeysService
    ) {}

    update(params: Omit<ListApiKeysRequestParams, 'partyId'> = {}) {
        this.fetchApiKeysService.update(Object.assign(params, !this.showInactive && { status: ApiKeyStatus.Active }));
    }

    create() {
        throw new Error('Method not implemented.');
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
