import { TransactionInfo } from '@vality/swag-payments';

import { AtLeastOneOf } from '@dsh/type-utils';

export type PaymentAdditionalInfo = AtLeastOneOf<{
    transactionInfo: TransactionInfo;
    externalID: string;
}>;
