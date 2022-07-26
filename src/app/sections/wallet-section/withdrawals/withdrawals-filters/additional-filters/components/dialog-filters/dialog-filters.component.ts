import { ChangeDetectionStrategy, Component, Inject, Injector, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@ngneat/reactive-forms';
import { ListWithdrawalsRequestParams } from '@vality/swag-wallet/lib/api/withdrawals.service';

import { ValidatedControlSuperclass } from '@dsh/utils';

import { AdditionalFilters, AdditionalFiltersForm } from '../../types';
import { filtersToForm, formToFilters } from '../../utils';

@Component({
    selector: 'dsh-dialog-filters',
    templateUrl: 'dialog-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogFiltersComponent
    extends ValidatedControlSuperclass<ListWithdrawalsRequestParams, AdditionalFiltersForm>
    implements OnInit
{
    control = this.fb.group<AdditionalFiltersForm>({
        mainInfo: null,
        status: null,
        amount: null,
    });

    constructor(
        injector: Injector,
        @Inject(MAT_DIALOG_DATA) private data: AdditionalFilters,
        private dialogRef: MatDialogRef<DialogFiltersComponent, AdditionalFiltersForm>,
        private fb: FormBuilder
    ) {
        super(injector);
    }

    ngOnInit() {
        this.control.patchValue(filtersToForm(this.data));
        super.ngOnInit();
    }

    clear(): void {
        this.control.reset();
    }

    close(): void {
        this.dialogRef.close(this.data);
    }

    confirm(): void {
        this.dialogRef.close(formToFilters(this.control.value));
    }
}
