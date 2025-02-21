import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControlSuperclass, Option, createControlProviders } from '@vality/matez';

@Component({
    selector: 'dsh-currency-field',
    templateUrl: 'currency-field.component.html',
    providers: createControlProviders(() => CurrencyFieldComponent),
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class CurrencyFieldComponent extends FormControlSuperclass<string> {
    @Input() set currencies(currencies: string[]) {
        this.options = currencies?.map((currency) => ({ label: currency, value: currency }));
    }

    options: Option<string>[] = [];
}
