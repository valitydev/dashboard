import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dsh-invoice-row-header',
    templateUrl: 'invoice-row-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class InvoiceRowHeaderComponent {}
