import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroupByValue, FormGroupSuperclass, createControlProviders } from '@vality/matez';

import { AdditionalFilters } from '../../types';

@Component({
    selector: 'dsh-dialog-filters',
    templateUrl: 'dialog-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => DialogFiltersComponent),
    standalone: false,
})
export class DialogFiltersComponent
    extends FormGroupSuperclass<Partial<AdditionalFilters>>
    implements OnInit
{
    control = this.formBuilder.group({
        invoiceIDs: null,
        shopIDs: null,
        invoiceStatus: null,
    }) as unknown as FormGroupByValue<AdditionalFilters>;

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: AdditionalFilters,
        private dialogRef: MatDialogRef<DialogFiltersComponent, AdditionalFilters>,
        private formBuilder: FormBuilder,
    ) {
        super();
    }

    ngOnInit() {
        this.control.patchValue(this.data);
        super.ngOnInit();
    }

    clear(): void {
        this.control.reset();
    }

    close(): void {
        this.dialogRef.close(this.data);
    }

    confirm(): void {
        this.dialogRef.close(this.control.value);
    }
}
