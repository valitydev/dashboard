import { map } from 'rxjs/operators';

import { attach } from './attach';
import { ObservableOrFn } from './get-observable';

export function inProgressFrom(progress: ObservableOrFn<number>, main: ObservableOrFn) {
    return attach(progress, main).pipe(map(Boolean));
}
