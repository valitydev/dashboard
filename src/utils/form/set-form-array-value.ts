import { AbstractControl, FormArray } from '@angular/forms';

export function replaceFormArrayValue<T>(
    formArray: FormArray<AbstractControl<T>>,
    value: T[],
    createControl: (v: T) => AbstractControl<T>,
): FormArray<AbstractControl<T>> {
    formArray.clear();
    if (Array.isArray(value)) {
        for (const item of value) {
            formArray.push(createControl(item));
        }
    }
    return formArray;
}
