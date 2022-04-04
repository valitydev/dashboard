import { Pipe, PipeTransform } from '@angular/core';
import { StatusModificationUnit } from '@vality/swag-claim-management';

import { StatusColor } from '../../../theme-manager';

@Pipe({
    name: 'claimStatusColor',
})
export class ClaimStatusColorPipe implements PipeTransform {
    transform(status: StatusModificationUnit.StatusEnum | string): StatusColor {
        const statusEnum = StatusModificationUnit.StatusEnum;
        switch (status) {
            case statusEnum.Accepted:
                return StatusColor.Success;
            case statusEnum.Denied:
                return StatusColor.Warn;
            case statusEnum.Pending:
            case statusEnum.Review:
                return StatusColor.Pending;
            case statusEnum.Revoked:
                return StatusColor.Neutral;
        }
    }
}
