import {
    BankCardPaymentSystem,
    BankCardTokenProvider,
    PaymentTerminalProvider,
    SearchPaymentsRequestParams,
} from '@vality/swag-anapi-v2';
import { PaymentInstitution } from '@vality/swag-payments';

import RealmEnum = PaymentInstitution.RealmEnum;

export interface PaymentSearchFormValue {
    realm: RealmEnum;
    fromTime: string;
    toTime: string;
    shopIDs?: string[];
    paymentStatus?: SearchPaymentsRequestParams['paymentStatus'];
    paymentFlow?: 'hold' | 'instant';
    paymentMethod?: 'bankCard' | 'paymentTerminal';
    paymentTerminalProvider?: PaymentTerminalProvider;
    invoiceIDs?: string[];
    invoiceID?: string;
    paymentID?: string;
    payerEmail?: string;
    payerIP?: string;
    payerFingerprint?: string;
    customerID?: string;
    first6?: string;
    last4?: string;
    bankCardTokenProvider?: BankCardTokenProvider;
    bankCardPaymentSystem?: BankCardPaymentSystem;
    paymentAmount?: number;
    rrn?: string;
    paymentAmountFrom?: number;
    paymentAmountTo?: number;
}
