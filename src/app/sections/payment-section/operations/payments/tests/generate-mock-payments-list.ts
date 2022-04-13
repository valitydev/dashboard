import { PaymentSearchResult } from '@vality/swag-anapi-v2';

import { createArrayOfLength } from '@dsh/app/shared/utils';

import { generateMockPayment } from './generate-mock-payment';

export function generateMockPaymentsList(length: number): PaymentSearchResult[] {
    return createArrayOfLength(length).map((_: null, index: number) => {
        return {
            ...generateMockPayment(),
            id: `mock_payment_${index}`,
        };
    });
}
