import { Pipe, PipeTransform } from '@angular/core';
import { Deposit } from '@vality/swag-wallets';

import { StatusColor } from '../../../theme-manager';

@Pipe({
    name: 'depositStatusColor',
    standalone: false,
})
export class DepositStatusColorPipe implements PipeTransform {
    transform(status: Deposit.StatusEnum): StatusColor {
        const statuses = Deposit.StatusEnum;
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
