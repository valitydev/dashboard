import { Observable, of } from 'rxjs';
import { catchError, filter, pluck } from 'rxjs/operators';

export class BasicError<T = any> {
    constructor(public error: T) {}
}

export function isError<T>(value: T | BasicError): value is BasicError {
    return value instanceof BasicError;
}

export function isPayload<T>(value: T | BasicError): value is T {
    return !isError(value);
}

export const replaceError = <T, E = any>(source: Observable<T>): Observable<T | BasicError<E>> =>
    source.pipe(catchError((value) => of(new BasicError(value))));

export const filterError = <E, T = any>(source: Observable<T | BasicError<E>>): Observable<E> =>
    source.pipe(
        filter<BasicError>((value) => value instanceof BasicError),
        pluck('error')
    );

export const filterPayload = <T>(source: Observable<T | BasicError>): Observable<T> => source.pipe(filter(isPayload));
