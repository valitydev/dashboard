import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroupSuperclass, createControlProviders } from '@vality/ng-core';

import { paymentStatusValidator } from '../../payment-status-filter';
import { AdditionalFilters, AdditionalFiltersForm } from '../../types';
import { formToFilters, filtersToForm } from '../../utils';

@Component({
    selector: 'dsh-dialog-filters',
    templateUrl: 'dialog-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => DialogFiltersComponent),
    standalone: false
})
export class DialogFiltersComponent
    extends FormGroupSuperclass<AdditionalFiltersForm>
    implements OnInit
{
    control = this.fb.group({
        main: null,
        paymentStatus: [null, paymentStatusValidator],
        paymentSum: null,
        tokenProvider: null,
        paymentSystem: null,
        invoices: null,
        shops: null,
        binPan: null,
    }) as unknown as FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: AdditionalFilters,
        private dialogRef: MatDialogRef<DialogFiltersComponent, AdditionalFilters>,
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
