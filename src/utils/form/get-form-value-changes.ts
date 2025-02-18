import { AbstractControl } from '@angular/forms';
import { getValue } from '@vality/matez';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export function getFormValueChanges<T>(form: AbstractControl<T>): Observable<T> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return form.valueChanges.pipe(
        startWith(form.value),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        map(() => getValue(form)),
    );
}
