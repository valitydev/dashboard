import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { provideValueAccessor, Option, FormControlSuperclass } from '@vality/ng-core';
import { Overwrite } from 'utility-types';

@Component({
    selector: 'dsh-radio-group-field',
    templateUrl: 'radio-group-field.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideValueAccessor(() => RadioGroupFieldComponent)],
})
export class RadioGroupFieldComponent<T> extends FormControlSuperclass<T> {
    @Input() options: Option<T>[];

    selected: T;

    handleIncomingValue(value: T): void {
        this.selected = value;
    }

    select({ value }: Overwrite<MatRadioChange, { value: T }>): void {
        this.selected = value;
        this.emitOutgoingValue(this.selected);
        this.onTouched();
    }
}
