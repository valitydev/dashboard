import { Component, Input, OnInit, ChangeDetectionStrategy, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder } from '@angular/forms';
import {
    createControlProviders,
    FormGroupByValue,
    FormComponentSuperclass,
    getErrorsTree,
    toMinor,
} from '@vality/ng-core';
import { InvoiceParams, Shop } from '@vality/swag-payments';
import isNil from 'lodash-es/isNil';
import moment, { Moment } from 'moment';

import { getFormValueChanges } from '@dsh/utils';

type FormData = InvoiceParams;

const mapToMinor = (value: number | null, currency: string | null): number | null => {
    if (isNil(value) || isNil(currency)) {
        return value;
    }
    return toMinor(value, currency);
};

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

    get currency() {
        return this.shops?.find((s) => s.id === this.control.value.shopID)?.currency;
    }

    get minDate(): Moment {
        return moment().add('2', 'day').startOf('day');
    }

    constructor(
        private fb: FormBuilder,
        private dr: DestroyRef,
    ) {
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
            randomizeAmount: null,
        }) as unknown as FormGroupByValue<Partial<FormData>>;

        getFormValueChanges(this.control)
            .pipe(takeUntilDestroyed(this.dr))
            .subscribe((v) => {
                this.emitOutgoingValue({
                    ...v,
                    metadata: {},
                    amount: mapToMinor(v.amount, this.currency),
                    currency: this.currency,
                    dueDate: moment(v.dueDate).utc().endOf('d').format(),
                    randomizeAmount: v.randomizeAmount || undefined,
                });
            });
    }

    validate() {
        return getErrorsTree(this.control);
    }

    handleIncomingValue(_value: FormData): void {}
}
