import { InvoiceLine } from '@vality/swag-payments';

export function generateMockInvoiceLine(): InvoiceLine {
    return {
        product: 'test product',
        quantity: 1,
        price: 100,
    };
}
