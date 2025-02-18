import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@jsverse/transloco';
import { DialogResponseStatus } from '@vality/matez';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { catchError, filter, switchMap, takeUntil, tap, map, first } from 'rxjs/operators';

import { ReportsService } from '@dsh/app/api/anapi';
import { ConfirmActionDialogComponent } from '@dsh/components/popups';

@Injectable()
export class CancelReportService {
    private destroy$: Subject<void> = new Subject();
    private cancelReport$: Subject<number> = new Subject();
    private cancelled$: Subject<void> = new Subject();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    reportCancelled$: Observable<void> = this.cancelled$.asObservable();

    constructor(
        private dialog: MatDialog,
        private reportsService: ReportsService,
        private transloco: TranslocoService,
        private snackBar: MatSnackBar,
    ) {}

    cancelReport(reportID: number) {
        this.cancelReport$.next(reportID);
    }

    init() {
        this.cancelReport$
            .pipe(
                takeUntil(this.destroy$),
                switchMap((reportID) =>
                    combineLatest([
                        of(reportID),
                        this.dialog
                            .open(ConfirmActionDialogComponent)
                            .afterClosed()
                            .pipe(filter((r) => r.status === DialogResponseStatus.Success)),
                    ]),
                ),
                switchMap(([reportID]) =>
                    this.reportsService.cancelReport({ reportID }).pipe(
                        catchError((e) => {
                            console.error(e);
                            return this.transloco
                                .selectTranslate(
                                    'reports.errors.cancelError',
                                    null,
                                    'payment-section',
                                )
                                .pipe(
                                    first(),
                                    tap((message) => this.snackBar.open(message, 'OK')),
                                    map(() => 'error'),
                                );
                        }),
                    ),
                ),
                filter((result) => result !== 'error'),
            )
            .subscribe(() => this.cancelled$.next());
    }

    destroy() {
        this.destroy$.next();
    }
}
