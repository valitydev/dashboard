import { ChangeDetectionStrategy, Component, Inject, OnInit, Injector } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@ngneat/reactive-forms';

import { ValidatedControlSuperclass, createControlProviders } from '@dsh/utils';

import { AdditionalFilters } from '../../types';

@Component({
    selector: 'dsh-dialog-filters',
    templateUrl: 'dialog-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(DialogFiltersComponent),
})
export class DialogFiltersComponent extends ValidatedControlSuperclass<AdditionalFilters> implements OnInit {
    control: FormGroup<AdditionalFilters> = this.formBuilder.group({
        invoiceIDs: null,
        shopIDs: null,
        invoiceStatus: null,
    });

    constructor(
        injector: Injector,
        @Inject(MAT_DIALOG_DATA) private data: AdditionalFilters,
        private dialogRef: MatDialogRef<DialogFiltersComponent, AdditionalFilters>,
        private formBuilder: FormBuilder
    ) {
        super(injector);
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
