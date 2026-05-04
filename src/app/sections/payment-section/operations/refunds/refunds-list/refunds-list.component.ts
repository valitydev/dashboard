import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Refund } from '@vality/swag-anapi-v2';

@Component({
    selector: 'dsh-refunds-list',
    templateUrl: 'refunds-list.component.html',
    standalone: false,
})
export class RefundsListComponent {
    @Input() refunds: Refund[];
    @Input() expandedId: number;
    @Input() lastUpdated: string;
    @Output() expandedIdChange = new EventEmitter<number>();
    @Output() refreshData = new EventEmitter<void>();
}
