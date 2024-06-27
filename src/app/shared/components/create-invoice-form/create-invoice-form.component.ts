import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
    createControlProviders,
    FormGroupByValue,
    FormComponentSuperclass,
    getErrorsTree,
    toMinor,
} from '@vality/ng-core';
import { InvoiceParams, Shop } from '@vality/swag-payments';
import isNil from 'lodash-es/isNil';
import * as moment from 'moment';
import { Moment } from 'moment';
import { combineLatest } from 'rxjs';

import { getFormValueChanges } from '@dsh/utils';

type FormData = InvoiceParams;

const mapToMinor = (value: number | null, currency: string | null): number | null => {
    if (isNil(value) || isNil(currency)) {
        return value;
    }
    return toMinor(value, currency);
};

@UntilDestroy()
@Component({
    selector: 'dsh-create-invoice-form',
    templateUrl: 'create-invoice-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => CreateInvoiceFormComponent),
})
export class CreateInvoiceFormComponent
    extends FormComponentSuperclass<Partial<FormData>>
    implements OnInit
{
    @Input() shops: Shop[];

    control = this.fb.group({}) as FormGroupByValue<Partial<FormData>>;

    randomizeAmountFormControl = new FormControl();

    get currency() {
        return this.shops?.find((s) => s.id === this.control.value.shopID)?.currency;
    }

    get minDate(): Moment {
        return moment().add('2', 'day').startOf('day');
    }

    constructor(private fb: FormBuilder) {
        super();
    }

    override ngOnInit(): void {
        super.ngOnInit();

        if (isNil(this.shops) || this.shops.length === 0) {
            throw new Error('Shops need to be initialized.');
        }

        this.control = this.fb.group({
            shopID: this.shops[0].id,
            dueDate: moment().add('1', 'month').endOf('day'),
            product: '',
            description: '',
            amount: null,
        }) as unknown as FormGroupByValue<Partial<FormData>>;

        combineLatest([
            getFormValueChanges(this.control),
            getFormValueChanges(this.randomizeAmountFormControl),
        ])
            .pipe(untilDestroyed(this))
            .subscribe(([v, randomizeAmountFormValue]) => {
                this.emitOutgoingValue({
                    ...v,
                    metadata: {},
                    amount: mapToMinor(v.amount, this.currency),
                    currency: this.currency,
                    dueDate: moment(v.dueDate).utc().endOf('d').format(),
                    randomizeAmount: randomizeAmountFormValue?.isRandomizeAmount
                        ? randomizeAmountFormValue.randomizeAmount
                        : undefined,
                });
            });
    }

    validate() {
        return getErrorsTree(this.control);
    }

    handleIncomingValue(_value: FormData): void {}
}
