import { Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DialogService } from '@vality/ng-core';
import { ApiKeyStatus } from '@vality/swag-api-keys-v2';
import { ApiKey } from '@vality/swag-api-keys-v2/lib/model/api-key';

import { ApiKeysDictionaryService } from '@dsh/app/api/api-keys';
import { mapToTimestamp } from '@dsh/app/custom-operators';
import { QueryParamsService } from '@dsh/app/shared';
import { ExpandedFragment, Column } from '@dsh/app/shared/components/accordion-table';

import { ApiKeyCreateDialogComponent } from './components/api-key-create-dialog/api-key-create-dialog.component';
import { FetchApiKeysService } from './fetch-api-keys.service';
import { API_KEY_STATUS_COLOR } from './types/api-key-status-color';

@UntilDestroy()
@Component({
    templateUrl: 'api-keys.component.html',
    styleUrls: ['api-keys.component.scss'],
    providers: [FetchApiKeysService],
})
export class ApiKeysComponent {
    showInactive = this.qp.params.showInactive;
    apiKeys$ = this.fetchApiKeysService.result$;
    isLoading$ = this.fetchApiKeysService.isLoading$;
    hasMore$ = this.fetchApiKeysService.hasMore$;
    lastUpdated$ = this.fetchApiKeysService.result$.pipe(mapToTimestamp);
    expanded = new ExpandedFragment(
        this.fetchApiKeysService.result$,
        () => this.fetchApiKeysService.more(),
        this.fetchApiKeysService.hasMore$
    );
    columns: Column<ApiKey>[] = [
        { label: this.transloco.translate('apiKeys.table.name', {}, 'payment-section'), field: (r) => r.name },
        {
            label: this.transloco.translate('apiKeys.table.createdAt', {}, 'payment-section'),
            field: (r) => r.createdAt,
            type: 'datetime',
        },
        {
            label: this.transloco.translate('apiKeys.table.status', {}, 'payment-section'),
            field: (d) => d.status,
            type: 'tag',
            typeParameters: {
                color: API_KEY_STATUS_COLOR,
                label: this.apiKeysDictionaryService.apiKeyStatus$,
            },
            hide: Breakpoints.Small,
        },
    ];
    contentHeader = [{ label: (r) => `${this.transloco.translate('apiKeys.apiKey', {}, 'payment-section')} #${r.id}` }];

    constructor(
        private qp: QueryParamsService<{ showInactive: boolean }>,
        private fetchApiKeysService: FetchApiKeysService,
        private dialogService: DialogService,
        private transloco: TranslocoService,
        private apiKeysDictionaryService: ApiKeysDictionaryService
    ) {
        this.update();
    }

    update() {
        this.fetchApiKeysService.load(Object.assign({}, !this.showInactive && { status: ApiKeyStatus.Active }));
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
}
