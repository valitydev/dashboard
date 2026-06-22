import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PaymentToolDetailsType } from '@dsh/app/api/payments';

import { PaymentToolDetails } from '@vality/swag-payments';


@Component({
    selector: 'dsh-payment-tool',
    templateUrl: 'payment-tool.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
export class PaymentToolComponent {
    @Input() paymentToolDetails: PaymentToolDetails;

    Type = PaymentToolDetailsType;
}
