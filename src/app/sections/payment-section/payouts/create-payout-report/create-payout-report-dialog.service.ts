import { Injectable } from '@angular/core';
import { Payout } from '@vality/swag-anapi-v2';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { catchError, filter, switchMap, tap } from 'rxjs/operators';

import { ReportsService } from '@dsh/app/api/anapi';

@Injectable()
export class CreatePayoutReportDialogService {
    private create$: Subject<Payout> = new Subject();
    private loading$ = new BehaviorSubject(false);
    private created$ = new BehaviorSubject(false);
    private error$ = new Subject<void>();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    isLoading$ = this.loading$.asObservable();
    // eslint-disable-next-line @typescript-eslint/member-ordering
    errorOccurred$ = this.error$.asObservable();
    // eslint-disable-next-line @typescript-eslint/member-ordering
    reportCreated$ = this.created$.asObservable();

    constructor(private reportsService: ReportsService) {
        this.create$
            .pipe(
                tap(() => {
                    this.loading$.next(true);
                    this.created$.next(false);
                }),
                switchMap((payout) =>
                    this.reportsService
                        .createReport({
                            // TODO: fix
                            fromTime: payout.createdAt,
                            toTime: payout.createdAt,
                            reportType: 'paymentRegistry',
                        })
                        .pipe(
                            catchError((e) => {
                                console.error(e);
                                this.loading$.next(false);
                                this.error$.next();
                                return of('error');
                            })
                        )
                ),
                filter((result) => result !== 'error')
            )
            .subscribe(() => {
                this.loading$.next(false);
                this.created$.next(true);
            });
    }

    create(payout: Payout) {
        this.create$.next(payout);
    }
}
