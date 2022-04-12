import { Observable, of } from 'rxjs';
import { catchError, filter, pluck } from 'rxjs/operators';

/**
 * @deprecated use toError()
 */
export class BasicError<T = any> {
    constructor(public error: T) {}
}

/**
 * @deprecated use toError()
 */
export function isError<T>(value: T | BasicError): value is BasicError {
    return value instanceof BasicError;
}

/**
 * @deprecated use toError()
 */
export function isPayload<T>(value: T | BasicError): value is T {
    return !isError(value);
}

/**
 * @deprecated use toError()
 */
export const replaceError = <T, E = any>(source: Observable<T>): Observable<T | BasicError<E>> =>
    source.pipe(catchError((value) => of(new BasicError(value))));

/**
 * @deprecated use toError()
 */
export const filterError = <E, T = any>(source: Observable<T | BasicError<E>>): Observable<E> =>
    source.pipe(
        filter<BasicError>((value) => value instanceof BasicError),
        pluck('error')
    );

/**
 * @deprecated use toError()
 */
export const filterPayload = <T>(source: Observable<T | BasicError>): Observable<T> => source.pipe(filter(isPayload));
