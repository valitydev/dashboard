import { PaymentSearchResult } from '@vality/swag-anapi-v2';

import { StatusColor as Color } from '../theme-manager';

export interface PaymentStatusInfo {
    color: Color;
    status: string;
}

export const getPaymentStatusInfo = (status: PaymentSearchResult.StatusEnum): PaymentStatusInfo => {
    const statusEnum = PaymentSearchResult.StatusEnum;
    switch (status) {
        case statusEnum.Processed:
            return { color: Color.Success, status: 'processed' };
        case statusEnum.Failed:
            return { color: Color.Warn, status: 'failed' };
        case statusEnum.Refunded:
            return { color: Color.Neutral, status: 'refunded' };
        case statusEnum.Cancelled:
            return { color: Color.Warn, status: 'cancelled' };
        case statusEnum.Captured:
            return { color: Color.Success, status: 'captured' };
        case statusEnum.Pending:
            return { color: Color.Pending, status: 'pending' };
        case statusEnum.Chargedback:
            return { color: Color.Neutral, status: 'pending' };
    }
};
