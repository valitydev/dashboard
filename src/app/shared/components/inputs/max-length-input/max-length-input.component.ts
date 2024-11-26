import {
    ChangeDetectionStrategy,
    Component,
    forwardRef,
    Input,
    OnChanges,
    booleanAttribute,
    DestroyRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
    Validators,
    ValidatorFn,
    FormControl,
} from '@angular/forms';
import { ComponentChanges } from '@vality/ng-core';
import isNil from 'lodash-es/isNil';
import isObject from 'lodash-es/isObject';
import { skip } from 'rxjs/operators';

import { ComponentInputError } from '@dsh/app/shared/services/error/models/component-input-error';
import { ErrorMatcher } from '@dsh/app/shared/utils';

@Component({
    selector: 'dsh-max-length-input',
    templateUrl: './max-length-input.component.html',
    styleUrls: ['./max-length-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MaxLengthInputComponent),
            multi: true,
        },
    ],
})
export class MaxLengthInputComponent implements OnChanges, ControlValueAccessor {
    @Input() label: string;
    @Input() maxLength: number;

    @Input({ transform: booleanAttribute }) required: boolean;

    @Input()
    get value(): string {
        return this.formControl.value;
    }
    set value(value: string | undefined) {
        this.formControl.setValue(value);
    }

    formControl = new FormControl();
    isDisabled = false;
    // material needs this to work with error state properly
    matcher = new ErrorMatcher();

    get lengthError(): boolean {
        return this.formControl.touched && this.formControl.invalid;
    }

    get lengthMessage(): string {
        const value = typeof this.formControl.value === 'string' ? this.formControl.value : '';
        return `${value.length} / ${this.maxLength}`;
    }

    constructor(private dr: DestroyRef) {}

    ngOnChanges(changes: ComponentChanges<MaxLengthInputComponent>): void {
        if (isObject(changes.maxLength) || isObject(changes.required)) {
            this.updateValidators();
        }
    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    onTouched(): void {
        this.innerOnTouched();
    }

    registerOnChange(onChange: (value: unknown) => void): void {
        this.formControl.valueChanges
            .pipe(skip(1), takeUntilDestroyed(this.dr))
            .subscribe((value: string) => {
                onChange(value);
            });
    }

    registerOnTouched(onTouch: () => void): void {
        this.innerOnTouched = onTouch;
    }

    writeValue(value: string): void {
        this.formControl.setValue(value);
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private innerOnTouched = () => {};

    private updateValidators(): void {
        const validators: ValidatorFn[] = [];

        if (this.required) {
            validators.push(Validators.required);
        }

        if (isNil(this.maxLength)) {
            throw new ComponentInputError(`MaxLength cannot be nil`, MaxLengthInputComponent);
        } else {
            validators.push(Validators.maxLength(this.maxLength));
        }

        this.formControl.setValidators(validators);
    }
}
