import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { provideValueAccessor, FormControlSuperclass, Option } from '@vality/ng-core';

@Component({
    selector: 'dsh-currency-field',
    templateUrl: 'currency-field.component.html',
    providers: [provideValueAccessor(() => CurrencyFieldComponent)],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyFieldComponent extends FormControlSuperclass<string> {
    @Input() set currencies(currencies: string[]) {
        this.options = currencies?.map((currency) => ({ label: currency, value: currency }));
    }

    options: Option<string>[] = [];
}
