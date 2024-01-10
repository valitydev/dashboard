import { PaymentSearchResult } from '@vality/swag-anapi-v2';

import { generateMockPayment } from './generate-mock-payment';

export function generateMockPaymentsList(length: number): PaymentSearchResult[] {
    return new Array(length).fill(null).map((_: null, index: number) => {
        return {
            ...generateMockPayment(),
            id: `mock_payment_${index}`,
        };
    });
}
