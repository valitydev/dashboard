import { TransactionInfo } from '@vality/swag-payments';

export interface PaymentAdditionalInfo {
    transactionInfo?: TransactionInfo;
    externalID?: string;
}
