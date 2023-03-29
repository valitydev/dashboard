import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { provideValueAccessor, WrappedFormControlSuperclass } from '@s-libs/ng-core';

import { Option } from '@dsh/components/form-controls/radio-group-field';

@Component({
    selector: 'dsh-currency-field',
    templateUrl: 'currency-field.component.html',
    providers: [provideValueAccessor(CurrencyFieldComponent)],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyFieldComponent extends WrappedFormControlSuperclass<string> {
    @Input() set currencies(currencies: string[]) {
        this.options = currencies?.map((currency) => ({ label: currency, value: currency }));
    }

    options: Option<string>[] = [];

    constructor() {
        super();
    }
}
