import { Pipe, PipeTransform } from '@angular/core';
import { PaymentSearchResult } from '@vality/swag-payments';

import { StatusColor } from '../../../../../../../../theme-manager';

@Pipe({
    name: 'paymentStatusColor',
})
export class PaymentStatusColorPipe implements PipeTransform {
    transform(status: PaymentSearchResult.StatusEnum): StatusColor {
        const statusEnum = PaymentSearchResult.StatusEnum;
        switch (status) {
            case statusEnum.Captured:
            case statusEnum.Processed:
                return StatusColor.Success;
            case statusEnum.Failed:
            case statusEnum.Cancelled:
                return StatusColor.Warn;
            case statusEnum.Pending:
                return StatusColor.Pending;
            case statusEnum.Refunded:
                return StatusColor.Neutral;
        }
    }
}
