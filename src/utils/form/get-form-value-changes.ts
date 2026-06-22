import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { AbstractControl } from '@angular/forms';

import { getValue } from '@vality/matez';

export function getFormValueChanges<T>(form: AbstractControl<T>): Observable<T> {
    return form.valueChanges.pipe(
        startWith(form.value),

        map(() => getValue(form)),
    );
}
