import { FormControl, ValidatorFn } from '@ngneat/reactive-forms';
import { PaymentStatus } from '@vality/swag-anapi-v2';
import isNil from 'lodash-es/isNil';

export const paymentStatusValidator: ValidatorFn = (control: FormControl<PaymentStatus.StatusEnum>) => {
    const value = control.value;
    const isValid = isNil(value) || Object.values(PaymentStatus.StatusEnum).includes(value);

    return isValid
        ? null
        : {
              paymentStatus: true,
          };
};
