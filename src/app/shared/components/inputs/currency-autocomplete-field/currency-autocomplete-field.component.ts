import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { coerceBoolean } from 'coerce-property';

import { Option } from '@dsh/components/form-controls/radio-group-field';
import { provideValueAccessor } from '@dsh/utils';

import { ConfigService } from '../../../../config';

@Component({
    selector: 'dsh-currency-autocomplete-field',
    templateUrl: 'currency-autocomplete-field.component.html',
    providers: [provideValueAccessor(() => CurrencyAutocompleteFieldComponent)],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyAutocompleteFieldComponent extends WrappedFormControlSuperclass<string> {
    @Input() label: string;
    @Input() @coerceBoolean required = false;

    options: Option<string>[] = this.configService.currencies
        .sort()
        .map((currency) => ({ label: currency, value: currency }));

    constructor(private configService: ConfigService) {
        super();
    }
}
