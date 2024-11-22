import { HoldExpiration } from '@dsh/app/shared/services/create-payment-link/types/hold-expiration';

export type Controls = {
    name: string;
    description: string;
    email: string;
    redirectUrl: string;
    locale: null;
    paymentFlowHold: false;
    onHoldExpiration: HoldExpiration.Cancel;
};
