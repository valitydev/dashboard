import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatLegacyRadioChange as MatRadioChange } from '@angular/material/legacy-radio';
import { WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { Overwrite } from 'utility-types';

import { provideValueAccessor } from '@dsh/utils';

import { Option } from './types/option';

@Component({
    selector: 'dsh-radio-group-field',
    templateUrl: 'radio-group-field.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideValueAccessor(() => RadioGroupFieldComponent)],
})
export class RadioGroupFieldComponent<T> extends WrappedFormControlSuperclass<T> {
    @Input() options: Option<T>[];

    selected: T;

    constructor() {
        super();
    }

    handleIncomingValue(value: T): void {
        this.selected = value;
    }

    select({ value }: Overwrite<MatRadioChange, { value: T }>): void {
        this.selected = value;
        this.emitOutgoingValue(this.selected);
        this.onTouched();
    }
}
