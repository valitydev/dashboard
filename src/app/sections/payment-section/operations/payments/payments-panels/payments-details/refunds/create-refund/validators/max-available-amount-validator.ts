import { AsyncValidatorFn, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export const maxAvailableAmountValidator = (
    availableAmount$: Observable<number>,
): AsyncValidatorFn => {
    return (control: FormControl<number>) => {
        return availableAmount$.pipe(
            filter((amount: number) => amount >= 0),
            map((amount: number) => {
                const value = control.value;
                return isNaN(value) || value > amount ? { maxAvailableAmount: true } : null;
            }),
        );
    };
};
