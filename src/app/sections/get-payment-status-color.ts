import { PaymentSearchResult } from '@vality/swag-anapi-v2';

import { StatusColor as Color } from '../theme-manager';

export const getPaymentStatusColor = (status: PaymentSearchResult.StatusEnum): Color => {
    const statusEnum = PaymentSearchResult.StatusEnum;
    switch (status) {
        case statusEnum.Processed:
            return Color.Success;
        case statusEnum.Failed:
            return Color.Warn;
        case statusEnum.Refunded:
            return Color.Neutral;
        case statusEnum.Cancelled:
            return Color.Warn;
        case statusEnum.Captured:
            return Color.Success;
        case statusEnum.Pending:
            return Color.Pending;
        case statusEnum.Chargedback:
            return Color.Neutral;
    }
};
