import { HoldExpiration } from '../../../services/create-payment-link/types/hold-expiration';
import { ORDERED_PAYMENT_METHODS_NAMES } from '../../../services/create-payment-link/types/ordered-payment-methods-names';

export type PaymentMethodControls = { [N in (typeof ORDERED_PAYMENT_METHODS_NAMES)[number]]: boolean };

export type Controls = {
    name: string;
    description: string;
    email: string;
    redirectUrl: string;
    paymentMethods: PaymentMethodControls;
    paymentFlowHold: boolean;
    holdExpiration?: HoldExpiration;
};

export const EMPTY_VALUE: Controls = {
    name: '',
    description: '',
    email: '',
    redirectUrl: '',
    paymentMethods: Object.fromEntries(
        ORDERED_PAYMENT_METHODS_NAMES.map((name) => [name, name === 'bankCard'])
    ) as Controls['paymentMethods'],
    paymentFlowHold: false,
    holdExpiration: HoldExpiration.Cancel,
};
