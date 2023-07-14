import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { createControlProviders, FormGroupByValue, FormComponentSuperclass, getErrorsTree } from '@vality/ng-core';
import { InvoiceLineTaxVAT } from '@vality/swag-anapi-v2';
import { Shop } from '@vality/swag-payments';
import isNil from 'lodash-es/isNil';
import * as moment from 'moment';
import { Moment } from 'moment';
import { map, startWith } from 'rxjs/operators';

import { shareReplayUntilDestroyed } from '@dsh/app/custom-operators';
import { replaceFormArrayValue, getFormValueChanges, toMinor, toMajor } from '@dsh/utils';

export const WITHOUT_VAT = Symbol('without VAT');
export const EMPTY_CART_ITEM: CartItem = { product: '', quantity: null, price: null, taxVatRate: WITHOUT_VAT };
export const EMPTY_FORM_DATA: FormData = {
    shopID: null,
    dueDate: null,
    product: '',
    description: '',
    cart: [EMPTY_CART_ITEM],
};

interface CartItem {
    product: string;
    quantity: number;
    price: number;
    taxVatRate: string | typeof WITHOUT_VAT;
}

export interface FormData {
    shopID: string;
    dueDate: Moment;
    product: string;
    description: string;
    cart: CartItem[];
}

@UntilDestroy()
@Component({
    selector: 'dsh-create-invoice-form',
    templateUrl: 'create-invoice-form.component.html',
    styleUrls: ['create-invoice-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => CreateInvoiceFormComponent),
})
export class CreateInvoiceFormComponent extends FormComponentSuperclass<Partial<FormData>> implements OnInit {
    @Input() shops: Shop[];

    control = this.fb.group({
        ...EMPTY_FORM_DATA,
        cart: this.fb.array([this.fb.group(EMPTY_CART_ITEM)]),
    }) as unknown as FormGroupByValue<Partial<FormData>>;
    totalAmount$ = this.control.controls.cart.valueChanges.pipe(
        startWith(this.control.controls.cart.value),
        map((v) => v.map(({ price, quantity }) => price * quantity).reduce((sum, s) => sum + s, 0)),
        shareReplayUntilDestroyed(this)
    );
    taxVatRates = Object.values(InvoiceLineTaxVAT.RateEnum);
    withoutVAT = WITHOUT_VAT;

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
        getFormValueChanges(this.control)
            .pipe(untilDestroyed(this))
            .subscribe((v) =>
                this.emitOutgoingValue({
                    ...v,
                    cart: v.cart.map((i) => ({
                        ...i,
                        price: i.price && this.currency ? toMinor(i.price, this.currency) : i.price,
                    })) as CartItem[],
                })
            );
    }

    validate() {
        return getErrorsTree(this.control);
    }

    handleIncomingValue(value: FormData): void {
        value = {
            ...EMPTY_FORM_DATA,
            ...(value || {}),
            cart: (value?.cart || [EMPTY_CART_ITEM]).map((v) => ({
                ...v,
                price: isNil(v.price) || isNil(this.currency) ? v.price : toMajor(v.price, this.currency),
            })),
        };
        replaceFormArrayValue<Partial<CartItem>>(this.control.controls.cart as unknown as FormArray, value.cart, (v) =>
            this.fb.group(v)
        );
        this.control.setValue(value);
    }

    addCartItem(): void {
        (this.control.controls.cart as unknown as FormArray).push(this.fb.group(EMPTY_CART_ITEM));
    }

    removeCartItem(idx: number): void {
        (this.control.controls.cart as unknown as FormArray).removeAt(idx);
    }
}
