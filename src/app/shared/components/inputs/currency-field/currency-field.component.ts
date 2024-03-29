import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControlSuperclass, Option, createControlProviders } from '@vality/ng-core';

@Component({
    selector: 'dsh-currency-field',
    templateUrl: 'currency-field.component.html',
    providers: createControlProviders(() => CurrencyFieldComponent),
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyFieldComponent extends FormControlSuperclass<string> {
    @Input() set currencies(currencies: string[]) {
        this.options = currencies?.map((currency) => ({ label: currency, value: currency }));
    }

    options: Option<string>[] = [];
}
