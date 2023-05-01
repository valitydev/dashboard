import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiKey } from '@vality/swag-api-keys';

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

    delete() {
        throw new Error('Method not implemented.');
    }
}
