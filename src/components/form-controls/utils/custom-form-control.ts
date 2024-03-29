import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Platform } from '@angular/cdk/platform';
import { AutofillMonitor } from '@angular/cdk/text-field';
import {
    AfterViewInit,
    Directive,
    DoCheck,
    ElementRef,
    HostBinding,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    Optional,
    Self,
    SimpleChanges,
} from '@angular/core';
import {
    ControlValueAccessor,
    UntypedFormControl,
    FormGroupDirective,
    NgControl,
    NgForm,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subject } from 'rxjs';
import { v4 as uuid } from 'uuid';

import { INPUT_MIXIN_BASE } from './input-base';

/* eslint-disable @angular-eslint/no-conflicting-lifecycle */
@UntilDestroy()
@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
/**
 * @deprecated use s-libs
 */
export class CustomFormControl<I, P = I>
    extends INPUT_MIXIN_BASE
    implements
        AfterViewInit,
        ControlValueAccessor,
        MatFormFieldControl<I>,
        OnDestroy,
        DoCheck,
        OnChanges
{
    /** The aria-describedby attribute on the input for improved a11y. */
    @HostBinding('attr.aria-describedby') _ariaDescribedby: string;

    readonly stateChanges: Subject<void> = new Subject<void>();

    errorState: boolean;

    controlType = 'text';

    autofilled = false;

    protected _disabled = false;
    @Input()
    get disabled(): boolean {
        if (this.ngControl && this.ngControl.disabled !== null) {
            return this.ngControl.disabled;
        }
        return this._disabled;
    }
    set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);

        // Browsers may not fire the blur event if the input is disabled too quickly.
        // Reset from here to ensure that the element doesn't become stuck.
        if (this.focused) {
            this.focused = false;
            this.stateChanges.next();
        }
    }

    protected _id: string;
    @HostBinding('attr.id')
    @Input()
    get id(): string {
        return this._id;
    }
    set id(value: string) {
        this._id = value || `custom-input-${uuid()}`;
    }

    // eslint-disable-next-line @typescript-eslint/member-ordering
    @Input()
    placeholder: string;

    protected _required = false;
    @Input()
    get required(): boolean {
        return this._required;
    }
    set required(value: boolean) {
        this._required = coerceBooleanProperty(value);
    }

    protected type = 'text';

    @Input()
    get value() {
        return this.formControl.value;
    }
    set value(value: I) {
        this.formControl.setValue(value);
        this.stateChanges.next();
    }

    get publicValue() {
        return this.toPublicValue(this.value);
    }
    set publicValue(value: P) {
        this.value = this.toInternalValue(value);
    }

    get details() {
        return this.getDetails(this.publicValue);
    }

    @HostBinding('class.floating')
    get shouldLabelFloat(): boolean {
        return this.focused || !this.empty;
    }

    // eslint-disable-next-line @typescript-eslint/member-ordering
    inputRef = new ElementRef<HTMLInputElement>(null);

    get empty(): boolean {
        return !this.formControl.value;
    }

    private _focused = false;
    get focused(): boolean {
        return this._focused;
    }
    set focused(value: boolean) {
        this._focused = value;
        this.stateChanges.next();
    }

    // eslint-disable-next-line @typescript-eslint/member-ordering
    formControl = new UntypedFormControl();
    // eslint-disable-next-line @typescript-eslint/member-ordering
    monitorsRegistered = false;

    private _onTouched: () => void;

    constructor(
        private focusMonitor: FocusMonitor,
        private elementRef: ElementRef<HTMLElement>,
        private platform: Platform,
        @Optional() @Self() public ngControl: NgControl,
        private autofillMonitor: AutofillMonitor,
        defaultErrorStateMatcher: ErrorStateMatcher,
        @Optional() parentForm: NgForm,
        @Optional() parentFormGroup: FormGroupDirective,
    ) {
        super(defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl, new Subject());
        if (this.ngControl !== null) {
            // Set the value accessor directly
            // (instead of providing NG_VALUE_ACCESSOR)
            // to avoid running into a circular import
            this.ngControl.valueAccessor = this;
        }
    }

    ngOnChanges(_changes?: SimpleChanges) {
        this.stateChanges.next();
    }

    ngDoCheck() {
        if (
            this.ngControl &&
            // TODO: dirty checking is temporary
            this.ngControl.dirty
        ) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
        }
    }

    ngAfterViewInit(): void {
        this.setInputElement();
    }

    ngOnDestroy() {
        this.stateChanges.complete();

        if (this.platform.isBrowser) {
            this.autofillMonitor.stopMonitoring(this.inputRef);
        }
    }

    onContainerClick(event: MouseEvent): void {
        if ((event.target as Element).tagName.toLowerCase() !== 'input') {
            this.focusMonitor.focusVia(this.inputRef, 'mouse');
        }
    }

    @HostListener('focusout')
    onTouched(): void {
        this._onTouched();
    }

    registerOnChange(onChange: (value: P) => void): void {
        // TODO: иногда передаются public value в toPublicValue и возникают ошибки
        this.formControl.valueChanges
            .pipe(untilDestroyed(this))
            .subscribe((v) => onChange(this.toPublicValue(v)));
    }

    registerOnTouched(onTouched: () => void): void {
        this._onTouched = onTouched;
        this._onTouched();
    }

    setDescribedByIds(ids: string[]): void {
        this._ariaDescribedby = ids.join(' ');
    }

    setDisabledState(shouldDisable: boolean): void {
        if (shouldDisable) {
            this.formControl.disable();
        } else {
            this.formControl.enable();
        }

        this.disabled = shouldDisable;
    }

    setInputElement(
        input: HTMLInputElement = this.elementRef.nativeElement.querySelector('input'),
    ) {
        this.inputRef.nativeElement = input;
        this.registerMonitors();
    }

    writeValue(value: P): void {
        this.formControl.setValue(this.toInternalValue(value), { emitEvent: false });
    }

    protected getDetails(value: P): string {
        return value as string;
    }

    protected toInternalValue(value: P): I {
        return value as unknown as I;
    }

    protected toPublicValue(value: I): P {
        return value as unknown as P;
    }

    private registerMonitors() {
        if (!this.monitorsRegistered && this.inputRef.nativeElement) {
            this.monitorsRegistered = true;
            if (this.platform.isBrowser) {
                this.autofillMonitor
                    .monitor(this.inputRef)
                    .pipe(untilDestroyed(this))
                    .subscribe((event) => {
                        this.autofilled = event.isAutofilled;
                        this.stateChanges.next();
                    });
            }
            this.focusMonitor
                .monitor(this.elementRef.nativeElement, true)
                .pipe(untilDestroyed(this))
                .subscribe((focusOrigin) => {
                    this.focused = !!focusOrigin;
                });
        }
    }
}
