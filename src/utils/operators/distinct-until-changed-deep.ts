import isEqual from 'lodash-es/isEqual';
import { distinctUntilChanged, MonoTypeOperatorFunction } from 'rxjs';

export function distinctUntilChangedDeep<T>(): MonoTypeOperatorFunction<T> {
    return distinctUntilChanged<T>(isEqual);
}
