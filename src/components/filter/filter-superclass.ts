import { AbstractControl, FormControl } from '@angular/forms';
import { FormComponentSuperclass } from '@vality/matez';
import isEqual from 'lodash-es/isEqual';
import { BehaviorSubject, Observable, defer } from 'rxjs';

import { isEmptyValue } from '@dsh/utils';

export abstract class FilterSuperclass<
    Inner,
    Outer = Inner,
> extends FormComponentSuperclass<Outer> {
    control: AbstractControl<Inner> = new FormControl();

    get value(): Inner {
        return this.control.value;
    }
    set value(value: Inner) {
        this.control.patchValue(value);
    }

    savedValue$: Observable<Inner> = defer(() => this._savedValue$.asObservable());
    get savedValue(): Outer {
        return this.innerToOuterValue(this._savedValue$.getValue());
    }

    get isActive(): boolean {
        return !this.isEmpty(this._savedValue$.getValue());
    }

    protected get empty(): Inner {
        return null;
    }

    private _savedValue$ = new BehaviorSubject<Inner>(this.empty);

    handleIncomingValue(value: Outer): void {
        this.set(this.outerToInnerValue(value));
    }

    // TODO: add validation support
    save(): void {
        this.set(this.control.value);
    }

    clear(): void {
        this.control.setValue(this.empty);
    }

    protected isEqual(oldValue: Inner, newValue: Inner): boolean {
        return isEqual(oldValue, newValue);
    }

    protected isEmpty(value: Inner): boolean {
        return this.isEqual(value, this.empty) || isEmptyValue(value);
    }

    protected set(value: Inner): void {
        value = this.isEmpty(value) ? this.empty : value;
        this.control.patchValue(value);
        if (!this.isEqual(value, this._savedValue$.getValue())) {
            this._savedValue$.next(value);
            this.emitOutgoingValue(this.innerToOuterValue(value));
        }
    }

    protected outerToInnerValue(outer: Outer): Inner {
        return outer as never;
    }

    protected innerToOuterValue(inner: Inner): Outer {
        return inner as never;
    }
}
