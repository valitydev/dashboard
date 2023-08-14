import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const mapToTimestamp = (s: Observable<unknown>): Observable<string> =>
    s.pipe(map(() => moment().utc().format()));
