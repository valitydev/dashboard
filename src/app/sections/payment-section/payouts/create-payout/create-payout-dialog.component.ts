import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { NotifyLogService } from '@vality/ng-core';
import { of } from 'rxjs';

import { ShopsDataService } from '@dsh/app/shared';
import { amountValidator } from '@dsh/components/form-controls';

import { filterShopsByRealm, mapToShopInfo } from '../../operations/operators';

import { CreatePayoutDialogService } from './create-payout-dialog.service';

@Component({
    selector: 'dsh-create-payout-dialog',
    templateUrl: 'create-payout-dialog.component.html',
    providers: [CreatePayoutDialogService],
})
export class CreatePayoutDialogComponent implements OnInit {
    form = this.fb.group({
        shopID: null,
    });

    hasSelectedShop = false;

    currentPayoutToolCurrency: string;

    shopsInfo$ = of(this.data.realm).pipe(
        filterShopsByRealm(this.shopsDataService.shops$),
        mapToShopInfo,
    );

    isPayoutToolsLoading$ = this.createPayoutDialogService.isLoading$;
    payoutTools$ = this.createPayoutDialogService.payoutTools$;
    hasPayoutTools$ = this.createPayoutDialogService.hasPayoutTools$;

    constructor(
        private dialogRef: MatDialogRef<CreatePayoutDialogComponent>,
        private fb: UntypedFormBuilder,
        private createPayoutDialogService: CreatePayoutDialogService,
        private log: NotifyLogService,
        private transloco: TranslocoService,
        private shopsDataService: ShopsDataService,
        @Inject(MAT_DIALOG_DATA) private data: { realm: string },
    ) {}

    ngOnInit() {
        this.createPayoutDialogService.payoutCreated$.subscribe(() =>
            this.dialogRef.close('created'),
        );
        this.createPayoutDialogService.errorOccurred$.subscribe((err) =>
            this.log.error(
                err,
                this.transloco.selectTranslate(
                    'payouts.errors.createError',
                    null,
                    'payment-section',
                ),
            ),
        );
    }

    cancel() {
        this.dialogRef.close();
    }

    create(formValue: { shopID: string; payoutToolID: string; amount: number }) {
        this.createPayoutDialogService.createPayout(formValue);
    }

    onShopSelectionChange(shopID: string) {
        this.hasSelectedShop = !!shopID;
        if (this.hasSelectedShop) {
            this.createPayoutDialogService.changeShopID(shopID);
            this.form.addControl('payoutToolID', this.fb.control('', [Validators.required]));
            this.form.addControl(
                'amount',
                this.fb.control('', [Validators.required, amountValidator, Validators.min(1)]),
            );
        } else {
            this.form.removeControl('payoutToolID');
            this.form.removeControl('amount');
        }
    }

    onPayoutToolSelectionChange(payoutToolCurrency: string) {
        this.currentPayoutToolCurrency = payoutToolCurrency;
    }
}
