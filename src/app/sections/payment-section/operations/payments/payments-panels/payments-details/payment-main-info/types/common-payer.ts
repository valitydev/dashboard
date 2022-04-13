import { CustomerPayer, PaymentResourcePayer, RecurrentPayer } from '@vality/swag-anapi-v2';

export type CommonPayer = PaymentResourcePayer | CustomerPayer | RecurrentPayer;
