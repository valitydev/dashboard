import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Invoice } from '@vality/swag-anapi-v2';

@Component({
    selector: 'dsh-invoices-list',
    templateUrl: 'invoices-list.component.html',
    standalone: false,
})
export class InvoicesListComponent {
    @Input() invoices: Invoice[];
    @Input() expandedId: number;
    @Input() lastUpdated: string;
    @Output() expandedIdChange = new EventEmitter<number>();
    @Output() refreshData = new EventEmitter<void>();
}
