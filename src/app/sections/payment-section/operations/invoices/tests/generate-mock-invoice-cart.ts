import { InvoiceCart } from '@vality/swag-payments';

import { generateMockInvoiceLine } from './generate-mock-invoice-line';

export function generateMockInvoiceCart(count: number): InvoiceCart {
    return new Array(count).fill(generateMockInvoiceLine());
}
