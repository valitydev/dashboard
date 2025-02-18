import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroupSuperclass } from '@vality/ng-core';
import { ListWithdrawalsRequestParams } from '@vality/swag-wallet';

import { AdditionalFilters, AdditionalFiltersForm } from '../../types';
import { filtersToForm, formToFilters } from '../../utils';

@Component({
    selector: 'dsh-dialog-filters',
    templateUrl: 'dialog-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DialogFiltersComponent
    extends FormGroupSuperclass<ListWithdrawalsRequestParams, AdditionalFiltersForm>
    implements OnInit
{
    control = this.fb.group<AdditionalFiltersForm>({
        mainInfo: null,
        status: null,
        amount: null,
    });

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: AdditionalFilters,
        private dialogRef: MatDialogRef<DialogFiltersComponent, AdditionalFiltersForm>,
        private fb: FormBuilder,
    ) {
        super();
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
