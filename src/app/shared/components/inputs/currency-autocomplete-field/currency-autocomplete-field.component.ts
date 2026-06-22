import { ChangeDetectionStrategy, Component, Input, booleanAttribute } from '@angular/core';
import { ConfigService } from '@dsh/app/config';

import { FormControlSuperclass, Option, createControlProviders } from '@vality/matez';

@Component({
    selector: 'dsh-currency-autocomplete-field',
    templateUrl: 'currency-autocomplete-field.component.html',
    providers: createControlProviders(() => CurrencyAutocompleteFieldComponent),
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class CurrencyAutocompleteFieldComponent extends FormControlSuperclass<string> {
    @Input() label: string;
    @Input({ transform: booleanAttribute }) required = false;

    options: Option<string>[] = this.configService.currencies
        .sort()
        .map((currency) => ({ label: currency, value: currency }));

    constructor(private configService: ConfigService) {
        super();
    }
}
