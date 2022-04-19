import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PaymentSearchResult } from '@vality/swag-anapi-v2';

@Component({
    selector: 'dsh-payments-row',
    templateUrl: 'payments-row.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsRowComponent {
    @Input() payment: PaymentSearchResult;
}
