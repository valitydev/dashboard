import { TransactionInfo } from '@vality/swag-payments';

export type PaymentAdditionalInfo = {
    transactionInfo?: TransactionInfo;
    externalID?: string;
};
