import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Invoice } from '@vality/swag-anapi-v2';

@Component({
    selector: 'dsh-invoice-main-info',
    templateUrl: 'invoice-main-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceMainInfoComponent {
    @Input() invoice: Invoice;
}
