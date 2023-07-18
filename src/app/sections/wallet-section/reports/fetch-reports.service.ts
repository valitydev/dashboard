import { Injectable } from '@angular/core';
import { FetchSuperclass, FetchResult, NotifyLogService } from '@vality/ng-core';
import { GetReportsRequestParams, Report } from '@vality/swag-wallet';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ReportsService } from '@dsh/app/api/wallet';

@Injectable({
    providedIn: 'root',
})
export class FetchReportsService extends FetchSuperclass<Report, GetReportsRequestParams> {
    constructor(private reportsService: ReportsService, private log: NotifyLogService) {
        super();
    }

    protected fetch(params: GetReportsRequestParams): Observable<FetchResult<Report, string>> {
        return this.reportsService.getReports(params).pipe(
            map(
                (result) => ({ result }),
                catchError((err) => {
                    this.log.error(err);
                    return of({ result: [] });
                })
            )
        );
    }
}
