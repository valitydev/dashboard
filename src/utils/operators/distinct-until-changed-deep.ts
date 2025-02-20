import isEqual from 'lodash-es/isEqual';
import { MonoTypeOperatorFunction, distinctUntilChanged } from 'rxjs';

export function distinctUntilChangedDeep<T>(): MonoTypeOperatorFunction<T> {
    return distinctUntilChanged<T>((prev, curr) => isEqual(prev, curr));
}
