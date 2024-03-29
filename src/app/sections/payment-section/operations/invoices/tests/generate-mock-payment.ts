import { Payment, PaymentFlow } from '@vality/swag-payments';

import { generateMockPayer } from './generate-mock-payer';
import { generateMockPaymentFlow } from './generate-mock-payment-flow';

export function generateMockPayment(
    id: string,
    status: Payment.StatusEnum = Payment.StatusEnum.Pending,
): Payment {
    return {
        id,
        invoiceID: 'testInvoiceID',
        createdAt: new Date(10000000).toISOString(),
        amount: 100,
        currency: 'RUB',
        flow: generateMockPaymentFlow(PaymentFlow.TypeEnum.PaymentFlowHold),
        payer: generateMockPayer('test'),
        status,
        metadata: {},
    };
}
