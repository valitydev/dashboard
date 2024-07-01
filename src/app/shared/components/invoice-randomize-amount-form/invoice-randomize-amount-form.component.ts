import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
    createControlProviders,
    FormGroupByValue,
    FormComponentSuperclass,
    getErrorsTree,
    toMinor,
} from '@vality/ng-core';
import isNil from 'lodash-es/isNil';

import { getFormValueChanges } from '@dsh/utils';

const mapToMinor = (value: number | null, currency: string | null): number | undefined => {
    if (isNil(value) || isNil(currency)) {
        return undefined;
    }
    return toMinor(value, currency);
};

export interface FormData {
    deviation: number;
    precision?: number;
    minAmountCondition?: number;
    maxAmountCondition?: number;
    amountMultiplicityCondition?: number;
}

@UntilDestroy()
@Component({
    selector: 'dsh-invoice-randomize-amount-form',
    templateUrl: 'invoice-randomize-amount-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => InvoiceRandomizeAmountFormComponent),
})
export class InvoiceRandomizeAmountFormComponent
    extends FormComponentSuperclass<Partial<FormData>>
    implements OnInit
{
    @Input() currency: string;

    control = this.fb.group({
        deviation: null,
        precision: null,
        minAmountCondition: null,
        maxAmountCondition: null,
        amountMultiplicityCondition: null,
    }) as unknown as FormGroupByValue<Partial<FormData>>;

    isRandomizeAmount = this.fb.control(false);

    constructor(private fb: FormBuilder) {
        super();
    }

    override ngOnInit(): void {
        super.ngOnInit();
        getFormValueChanges(this.control)
            .pipe(untilDestroyed(this))
            .subscribe((v) => {
                this.emitOutgoingValue({
                    ...v,
                    deviation: mapToMinor(v.deviation, this.currency),
                    minAmountCondition: mapToMinor(v.minAmountCondition, this.currency),
                    maxAmountCondition: mapToMinor(v.maxAmountCondition, this.currency),
                    amountMultiplicityCondition: mapToMinor(
                        v.amountMultiplicityCondition,
                        this.currency,
                    ),
                });
            });
    }

    validate() {
        return getErrorsTree(this.control);
    }

    handleIncomingValue(_value: FormData): void {}
}
