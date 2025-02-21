import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';

import { ReportsService } from '@dsh/app/api/anapi';

import { formValueToCreateValue } from './form-value-to-create-value';

@Injectable()
export class CreateReportDialogService {
    private create$ = new Subject();
    private loading$ = new BehaviorSubject(false);
    private error$ = new Subject<void>();
    private created$ = new Subject<void>();

    isLoading$ = this.loading$.asObservable();

    errorOccurred$ = this.error$.asObservable();

    reportCreated$ = this.created$.asObservable();

    constructor(private reportsService: ReportsService) {
        this.create$
            .pipe(
                tap(() => this.loading$.next(true)),
                map(formValueToCreateValue),
                switchMap((req) =>
                    this.reportsService.createReport(req).pipe(
                        catchError((e) => {
                            console.error(e);
                            this.loading$.next(false);
                            this.error$.next();
                            return of('error');
                        }),
                    ),
                ),
                filter((result) => result !== 'error'),
            )
            .subscribe(() => {
                this.loading$.next(false);
                this.created$.next();
            });
    }

    create(formValue: unknown) {
        this.create$.next(formValue);
    }
}
