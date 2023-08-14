import { Observable, of } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';

/**
 * @deprecated use toError()
 */
export const takeError = <T>(source: Observable<T>) =>
    source.pipe(
        filter((_) => false),
        catchError((err) => of(err)),
    );
