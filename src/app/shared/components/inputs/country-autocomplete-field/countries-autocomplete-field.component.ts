import { ChangeDetectionStrategy, Component, Input, booleanAttribute } from '@angular/core';
import { FormControlSuperclass, createControlProviders } from '@vality/ng-core';
import { map } from 'rxjs/operators';

import { CountriesService } from '@dsh/app/api/payments';

import { CountryId } from './types';
import { countriesToOptions } from './utils';

@Component({
    selector: 'dsh-country-autocomplete-field',
    templateUrl: 'country-autocomplete-field.component.html',
    providers: createControlProviders(() => CountryAutocompleteFieldComponent),
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryAutocompleteFieldComponent extends FormControlSuperclass<CountryId> {
    @Input() label: string;
    @Input({ transform: booleanAttribute }) required = false;

    countries$ = this.countriesService.countries$;
    options$ = this.countries$.pipe(map(countriesToOptions));

    constructor(private countriesService: CountriesService) {
        super();
    }
}
