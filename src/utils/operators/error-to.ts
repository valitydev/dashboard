import { Subject, throwError, MonoTypeOperatorFunction, EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export function errorTo<T>(
    subject$: Subject<unknown>,
    rethrow = false,
): MonoTypeOperatorFunction<T> {
    return (src$) =>
        src$.pipe(
            tap(() => subject$.next(null)),
            catchError((err) => {
                subject$.next(err);
                return rethrow ? throwError(err) : EMPTY;
            }),
        );
}
