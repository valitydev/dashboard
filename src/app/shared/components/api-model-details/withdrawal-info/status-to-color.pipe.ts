import { Pipe, PipeTransform } from '@angular/core';
import { WithdrawalStatus } from '@vality/swag-wallets';

import { StatusColor as Color } from '../../../../theme-manager';

@Pipe({
    name: 'statusToColor',
    standalone: false,
})
export class StatusToColorPipe implements PipeTransform {
    transform(status: WithdrawalStatus.StatusEnum): Color {
        switch (status) {
            case 'Succeeded':
                return Color.Success;
            case 'Pending':
                return Color.Pending;
            case 'Failed':
                return Color.Warn;
        }
    }
}
