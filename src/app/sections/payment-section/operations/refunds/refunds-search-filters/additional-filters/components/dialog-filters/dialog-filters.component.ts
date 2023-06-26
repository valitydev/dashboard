import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ValidatedControlSuperclass, createControlProviders } from '@dsh/utils';

import { FormGroupByValue } from '../../../../../../../../../../../ng-libs/projects/ng-core/dist';
import { AdditionalFilters } from '../../types';

@Component({
    selector: 'dsh-dialog-filters',
    templateUrl: 'dialog-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => DialogFiltersComponent),
})
export class DialogFiltersComponent extends ValidatedControlSuperclass<Partial<AdditionalFilters>> implements OnInit {
    control = this.formBuilder.group({
        invoiceIDs: null,
        shopIDs: null,
        refundStatus: null,
    }) as unknown as FormGroupByValue<AdditionalFilters>;

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: AdditionalFilters,
        private dialogRef: MatDialogRef<DialogFiltersComponent, AdditionalFilters>,
        private formBuilder: FormBuilder
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
