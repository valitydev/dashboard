import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Payment } from '@vality/swag-payments';

@Component({
    selector: 'dsh-payment-details',
    templateUrl: 'payment-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class PaymentDetailsComponent {
    @Input() payment: Payment;
}
