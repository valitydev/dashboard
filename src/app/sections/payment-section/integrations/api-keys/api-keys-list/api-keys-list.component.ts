import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogService } from '@vality/ng-core';
import { ApiKey } from '@vality/swag-api-keys';

import { ApiKeyDeleteDialogComponent } from './components/api-key-delete-dialog/api-key-delete-dialog.component';

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
