import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { provideValueAccessor } from '@vality/ng-core';
import { coerceBoolean } from 'coerce-property';
import { map } from 'rxjs/operators';

import { CountriesService } from '@dsh/app/api/payments';

import { CountryId } from './types';
import { countriesToOptions } from './utils';

@Component({
    selector: 'dsh-country-autocomplete-field',
    templateUrl: 'country-autocomplete-field.component.html',
    providers: [provideValueAccessor(() => CountryAutocompleteFieldComponent)],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryAutocompleteFieldComponent extends WrappedFormControlSuperclass<CountryId> {
    @Input() label: string;
    @Input() @coerceBoolean required = false;

    countries$ = this.countriesService.countries$;
    options$ = this.countries$.pipe(map(countriesToOptions));

    constructor(private countriesService: CountriesService) {
        super();
    }
}
