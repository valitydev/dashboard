import { Pipe, PipeTransform } from '@angular/core';
import { Refund } from '@vality/swag-payments';

import { StatusColor } from '../../../../theme-manager';

@Pipe({
    name: 'refundStatusColor',
    standalone: false,
})
export class RefundStatusColorPipe implements PipeTransform {
    transform(status: Refund.StatusEnum): StatusColor {
        const statuses = Refund.StatusEnum;
        switch (status) {
            case statuses.Succeeded:
                return StatusColor.Success;
            case statuses.Failed:
                return StatusColor.Warn;
            case statuses.Pending:
                return StatusColor.Pending;
            default:
                return StatusColor.Neutral;
        }
    }
}
