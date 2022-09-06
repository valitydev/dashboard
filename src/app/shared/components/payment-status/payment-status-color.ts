import { PaymentSearchResult } from '@vality/swag-anapi-v2';

import { StatusColor } from '../../../theme-manager';

import Status = PaymentSearchResult.StatusEnum;

export const PAYMENT_STATUS_COLOR: { [N in Status]: StatusColor } = {
    processed: StatusColor.Success,
    failed: StatusColor.Warn,
    refunded: StatusColor.Neutral,
    cancelled: StatusColor.Warn,
    captured: StatusColor.Success,
    pending: StatusColor.Pending,
    chargedback: StatusColor.Neutral,
};
