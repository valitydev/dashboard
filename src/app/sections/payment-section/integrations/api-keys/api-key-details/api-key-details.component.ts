import { Component, Input } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { DialogService } from '@vality/ng-core';
import { ApiKey } from '@vality/swag-api-keys-v2';

import { ApiKeysDictionaryService } from '@dsh/app/api/api-keys';

import { ApiKeyDeleteDialogComponent } from './components/api-key-delete-dialog/api-key-delete-dialog.component';
import { API_KEY_STATUS_COLOR } from '../types/api-key-status-color';

@UntilDestroy()
@Component({
    selector: 'dsh-api-key-details',
    templateUrl: 'api-key-details.component.html',
})
export class ApiKeyDetailsComponent {
    @Input() apiKey: ApiKey;

    statusColors = API_KEY_STATUS_COLOR;
    statusLabels$ = this.apiKeysDictionaryService.apiKeyStatus$;

    constructor(private dialogService: DialogService, private apiKeysDictionaryService: ApiKeysDictionaryService) {}

    delete(apiKey: ApiKey) {
        this.dialogService.open(ApiKeyDeleteDialogComponent, { apiKeyId: apiKey.id });
    }
}
