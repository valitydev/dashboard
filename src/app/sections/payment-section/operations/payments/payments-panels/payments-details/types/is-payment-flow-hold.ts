import { PaymentFlow, PaymentFlowHold } from '@vality/swag-anapi-v2';

export function isPaymentFlowHold(flow: PaymentFlow): flow is PaymentFlowHold {
    return flow.type === 'PaymentFlowHold';
}
