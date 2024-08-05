import { PaymentFlow } from '@vality/swag-payments';

export interface PaymentLinkParams {
    invoiceID?: string;
    invoiceAccessToken?: string;
    invoiceTemplateID?: string;
    invoiceTemplateAccessToken?: string;
    name?: string;
    description?: string;
    email?: string;
    redirectUrl?: string;
    locale?: string;
    paymentFlow?: PaymentFlow;
}
