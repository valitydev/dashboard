import { UntypedFormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const oneMustBeSelected: ValidatorFn = (
    control: UntypedFormGroup,
): ValidationErrors | null =>
    control.value.map((c) => c.selected).includes(true)
        ? null
        : // eslint-disable-next-line @typescript-eslint/naming-convention
          { Error: 'At least one of checkboxes select needed' };
