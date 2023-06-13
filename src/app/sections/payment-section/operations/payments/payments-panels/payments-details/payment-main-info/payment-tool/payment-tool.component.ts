import { Component, Input } from '@angular/core';
import { PaymentToolDetails } from '@vality/swag-payments';

import { PaymentToolDetailsType } from '@dsh/app/api/payments';

@Component({
    selector: 'dsh-payment-tool',
    templateUrl: 'payment-tool.component.html',
})
export class PaymentToolComponent {
    @Input() paymentToolDetails: PaymentToolDetails;

    // eslint-disable-next-line @typescript-eslint/naming-convention
    Type = PaymentToolDetailsType;
}
