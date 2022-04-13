import { PaymentSearchResult } from '@vality/swag-anapi-v2';

// better to make Payment as a class that knows how to produce its id
export const getPaymentId = (payment: PaymentSearchResult): string => {
    return `${payment.invoiceID}${payment.id}`;
};
