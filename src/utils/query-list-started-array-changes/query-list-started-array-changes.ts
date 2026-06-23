import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { QueryList } from '@angular/core';

export function queryListStartedArrayChanges<T>(queryList: QueryList<T>): Observable<T[]> {
    return (queryList.changes as Observable<QueryList<T>>).pipe(
        startWith(queryList),
        map((ql) => ql.toArray()),
    );
}
