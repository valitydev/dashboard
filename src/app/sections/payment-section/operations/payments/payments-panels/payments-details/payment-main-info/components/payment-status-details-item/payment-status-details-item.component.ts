import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PaymentSearchResult } from '@vality/swag-anapi-v2';

@Component({
    selector: 'dsh-payment-status-details-item',
    templateUrl: './payment-status-details-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentStatusDetailsItemComponent {
    @Input() status: PaymentSearchResult.StatusEnum;
}
