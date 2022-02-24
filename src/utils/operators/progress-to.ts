import { BehaviorSubject, defer, MonoTypeOperatorFunction } from 'rxjs';
import { finalize } from 'rxjs/operators';

function updateValue<V>(subjectOrFn: BehaviorSubject<V> | (() => BehaviorSubject<V>), updateFn: (value: V) => V) {
    const subject$ = typeof subjectOrFn === 'function' ? subjectOrFn() : subjectOrFn;
    return subject$.next(updateFn(subject$.getValue()));
}

export function progressTo<T>(
    subjectOrFn: BehaviorSubject<number> | (() => BehaviorSubject<number>)
): MonoTypeOperatorFunction<T> {
    return (src$) => {
        return defer(() => {
            updateValue(subjectOrFn, (v) => v + 1);
            return src$;
        }).pipe(
            finalize(() => {
                updateValue(subjectOrFn, (v) => v - 1);
            })
        );
    };
}
