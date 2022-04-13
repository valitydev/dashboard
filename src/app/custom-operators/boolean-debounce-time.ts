import { EMPTY, Observable, timer } from 'rxjs';
import { debounce, distinctUntilChanged } from 'rxjs/operators';

/**
 * @deprecated
 */
export const booleanDebounceTime =
    (timeoutMs: number = 500) =>
    (s: Observable<boolean>): Observable<boolean> =>
        s.pipe(
            distinctUntilChanged(),
            debounce((v) => (v ? timer(timeoutMs) : EMPTY)),
            distinctUntilChanged()
        );
