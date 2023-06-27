import { FormGroupDirective, NgForm, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class ErrorMatcher implements ErrorStateMatcher {
    isErrorState(control: AbstractControl | null, _form: FormGroupDirective | NgForm | null): boolean {
        return !!(control && control.invalid && (control.dirty || control.touched));
    }
}
