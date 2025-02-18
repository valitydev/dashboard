import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroupByValue } from '@vality/matez';

import { getAbstractControl } from '@dsh/app/shared/utils';
import { formatMajorAmountToStr, getAmountNum } from '@dsh/app/shared/utils/amount-formatters';
import { removeDictEmptyFields } from '@dsh/utils';

import { DepositStatusFilterValue } from '../../deposit-status-filter/types/deposit-status-filter-value';
import { depositStatusValidator } from '../../deposit-status-filter/validators/deposit-status-validator';
import { DepositSumFilter } from '../../deposit-sum-filter';
import { MainInfoFilters } from '../../main-info-filters';
import { AdditionalFilters } from '../../types/additional-filters';
import { AdditionalFiltersForm } from '../../types/additional-filters-form';

@Component({
    selector: 'dsh-dialog-filters',
    templateUrl: 'dialog-filters.component.html',
    styleUrls: ['dialog-filters.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class DialogFiltersComponent implements OnInit {
    form = this.fb.group({
        main: this.fb.group({
            depositID: [''],
            walletID: [null],
            identityID: [''],
            sourceID: [''],
        }),
        depositStatus: [null, depositStatusValidator],
        depositSum: this.fb.group({
            min: [''],
            max: [''],
        }),
    }) as FormGroup;

    get mainFiltersGroup(): FormGroupByValue<MainInfoFilters> {
        return getAbstractControl(this.form, 'main');
    }

    get statusFilterControl(): FormControl<DepositStatusFilterValue> {
        return getAbstractControl(this.form, 'depositStatus');
    }

    get depositSumFiltersGroup(): FormGroupByValue<DepositSumFilter> {
        return getAbstractControl(this.form, 'depositSum');
    }

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: AdditionalFilters,
        private dialogRef: MatDialogRef<DialogFiltersComponent, AdditionalFilters>,
        private fb: FormBuilder,
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    clear(): void {
        this.resetFiltersData();
    }

    close(): void {
        this.dialogRef.close(this.data);
    }

    confirm(): void {
        this.dialogRef.close(this.getFiltersData());
    }

    private initForm(): void {
        this.form.setValue(this.getInitFormValues());
    }

    private getInitFormValues(): AdditionalFiltersForm {
        const {
            depositID = '',
            walletID = null,
            identityID = '',
            sourceID = '',
            depositStatus = null,
            depositAmountFrom = null,
            depositAmountTo = null,
        } = this.data;
        return {
            main: {
                depositID,
                walletID,
                identityID,
                sourceID,
            },
            depositStatus,
            depositSum: {
                min: formatMajorAmountToStr(depositAmountFrom),
                max: formatMajorAmountToStr(depositAmountTo),
            },
        };
    }

    private getFiltersData(): AdditionalFilters {
        const { min, max } = this.extractGroupValidFields(this.depositSumFiltersGroup);

        return removeDictEmptyFields({
            ...this.extractGroupValidFields(this.mainFiltersGroup),
            ...removeDictEmptyFields({
                depositAmountFrom: getAmountNum(String(min)),
                depositAmountTo: getAmountNum(String(max)),
            }),
            depositStatus: this.statusFilterControl.value,
        }) as unknown;
    }

    private extractGroupValidFields<T>(group: FormGroupByValue<T>): Partial<T> {
        return Object.entries(group.controls).reduce(
            (acc: Partial<T>, [key, control]: [string, AbstractControl]) => {
                if (control.valid) {
                    acc[key] = control.value;
                }
                return acc;
            },
            {},
        );
    }

    private resetFiltersData(): void {
        this.form.reset();
    }
}
