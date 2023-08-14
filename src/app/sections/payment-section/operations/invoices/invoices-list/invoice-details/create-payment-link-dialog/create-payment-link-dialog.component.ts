import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, defer, merge, Subject } from 'rxjs';
import { mapTo, switchMap } from 'rxjs/operators';

import { InvoicesService } from '@dsh/app/api/payments';
import { shareReplayRefCount } from '@dsh/app/custom-operators';
import { CreatePaymentLinkService } from '@dsh/app/shared/services/create-payment-link/create-payment-link.service';

import { CreatePaymentLinkDialogData } from './types/create-payment-link-dialog-data';

@Component({
    selector: 'dsh-create-payment-link-dialog',
    templateUrl: 'create-payment-link-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePaymentLinkDialogComponent {
    paymentMethods$ = this.invoicesService
        .getInvoicePaymentMethods({ invoiceID: this.data.invoice.id })
        .pipe(shareReplayRefCount());

    formControl = new FormControl();
    paymentLink$ = merge(
        defer(() => this.create$).pipe(
            switchMap(() =>
                this.createPaymentLinkService.createPaymentLinkByInvoice(
                    this.data.invoice,
                    this.formControl.value,
                ),
            ),
        ),
        this.formControl.valueChanges.pipe(mapTo('')),
    );
    inProgress$ = new BehaviorSubject(false);

    private create$ = new Subject<void>();

    constructor(
        private dialogRef: MatDialogRef<CreatePaymentLinkDialogComponent, 'cancel'>,
        @Inject(MAT_DIALOG_DATA) public data: CreatePaymentLinkDialogData,
        private createPaymentLinkService: CreatePaymentLinkService,
        private invoicesService: InvoicesService,
    ) {}

    cancel(): void {
        this.dialogRef.close('cancel');
    }

    create(): void {
        this.create$.next();
    }
}
