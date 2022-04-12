import { merge, Observable, MonoTypeOperatorFunction, EMPTY } from 'rxjs';
import { map } from 'rxjs/operators';

import { ObservableOrFn, getObservable } from './get-observable';

export function attach<T>(attached: ObservableOrFn<T>, main: ObservableOrFn): Observable<T> {
    return merge(getObservable(attached), getObservable(main).pipe(map(() => EMPTY)) as Observable<never>);
}

export function attachTo<T>(main: ObservableOrFn): MonoTypeOperatorFunction<T> {
    return (src$) => attach(src$, main);
}
