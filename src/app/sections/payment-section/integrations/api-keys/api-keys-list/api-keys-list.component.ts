import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { DialogService } from '@vality/ng-core';
import { ApiKey } from '@vality/swag-api-keys-v2';

import { ApiKeyDeleteDialogComponent } from './components/api-key-delete-dialog/api-key-delete-dialog.component';

@UntilDestroy()
@Component({
    selector: 'dsh-api-keys-list',
    templateUrl: 'api-keys-list.component.html',
})
export class ApiKeysListComponent {
    @Input() apiKeys: ApiKey[];
    @Input() expandedId: number;
    @Input() lastUpdated: string;
    @Output() expandedIdChange = new EventEmitter<number>();
    @Output() refreshData = new EventEmitter<void>();

    constructor(private dialogService: DialogService) {}

    delete(apiKey: ApiKey) {
        this.dialogService.open(ApiKeyDeleteDialogComponent, { apiKeyId: apiKey.id });
    }
}
