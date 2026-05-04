import { Pipe, PipeTransform } from '@angular/core';
import { Payment } from '@vality/swag-payments';

import { StatusColor } from '../../../../theme-manager';

@Pipe({
    name: 'paymentStatusColor',
    standalone: false,
})
export class PaymentStatusColorPipe implements PipeTransform {
    transform(status: Payment.StatusEnum): StatusColor {
        const statuses = Payment.StatusEnum;
        switch (status) {
            case statuses.Processed:
            case statuses.Captured:
                return StatusColor.Success;
            case statuses.Cancelled:
            case statuses.Failed:
                return StatusColor.Warn;
            case statuses.Pending:
                return StatusColor.Pending;
            case statuses.Refunded:
            default:
                return StatusColor.Neutral;
        }
    }
}
