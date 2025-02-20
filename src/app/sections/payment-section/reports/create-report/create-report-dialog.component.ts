import { ChangeDetectionStrategy, Component, DestroyRef, Inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@jsverse/transloco';
import moment from 'moment';
import { of, switchMap } from 'rxjs';
import { first } from 'rxjs/operators';

import { ShopsDataService } from '@dsh/app/shared';

import { filterShopsByRealm, mapToShopInfo } from '../../operations/operators';

import { CreateReportDialogService } from './create-report-dialog.service';

const TIME_PATTERN = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;

@Component({
    templateUrl: 'create-report-dialog.component.html',
    styleUrls: ['create-report-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CreateReportDialogService],
    standalone: false,
})
export class CreateReportDialogComponent implements OnInit {
    isLoading$ = this.createReportDialogService.isLoading$;
    shopsInfo$ = of(this.data.realm).pipe(
        filterShopsByRealm(this.shopsDataService.shops$),
        mapToShopInfo,
    );
    form = this.fb.group({
        fromDate: [moment().startOf('month').format(), Validators.required],
        fromTime: ['00:00:00', Validators.pattern(TIME_PATTERN)],
        toDate: [moment().endOf('month').add(1).format(), Validators.required],
        toTime: ['00:00:00', Validators.pattern(TIME_PATTERN)],
        shopID: null,
    });

    constructor(
        private dialogRef: MatDialogRef<CreateReportDialogComponent, 'cancel' | 'created'>,
        private shopsDataService: ShopsDataService,
        private fb: UntypedFormBuilder,
        private createReportDialogService: CreateReportDialogService,
        private transloco: TranslocoService,
        private snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) private data: { realm: string },
        private dr: DestroyRef,
    ) {}

    ngOnInit() {
        this.createReportDialogService.reportCreated$.subscribe(() =>
            this.dialogRef.close('created'),
        );
        this.createReportDialogService.errorOccurred$
            .pipe(
                switchMap(() =>
                    this.transloco
                        .selectTranslate('reports.errors.createError', null, 'payment-section')
                        .pipe(first()),
                ),
                takeUntilDestroyed(this.dr),
            )
            .subscribe((message) => this.snackBar.open(message, 'OK'));
    }

    create(formValue: unknown) {
        this.createReportDialogService.create(formValue);
    }

    cancel() {
        this.dialogRef.close('cancel');
    }
}
