import { SearchPaymentsRequestParams } from '@vality/swag-anapi-v2';
import { PaymentInstitution } from '@vality/swag-payments';

import RealmEnum = PaymentInstitution.RealmEnum;

export interface PaymentSearchFormValue
    extends Pick<
        SearchPaymentsRequestParams,
        | 'paymentStatus'
        | 'paymentTerminalProvider'
        | 'bankCardTokenProvider'
        | 'bankCardPaymentSystem'
        | 'paymentMethod'
        | 'paymentFlow'
    > {
    realm: RealmEnum;
    fromTime: string;
    toTime: string;
    shopIDs?: string[];
    invoiceIDs?: string[];
    invoiceID?: string;
    paymentID?: string;
    payerEmail?: string;
    payerIP?: string;
    payerFingerprint?: string;
    customerID?: string;
    first6?: string;
    last4?: string;
    paymentAmount?: number;
    rrn?: string;
    paymentAmountFrom?: number;
    paymentAmountTo?: number;
}
