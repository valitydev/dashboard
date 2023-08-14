import { Injectable, Injector } from '@angular/core';
import { Country, CountriesService as ApiCountriesService } from '@vality/swag-payments';
import sortBy from 'lodash-es/sortBy';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';

import { SHARE_REPLAY_CONF } from '@dsh/app/custom-operators';
import { ErrorService } from '@dsh/app/shared/services';

import { createApi } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class CountriesService extends createApi(ApiCountriesService) {
    countries$: Observable<Country[]> = this.getCountries().pipe(
        catchError((error) => {
            this.errorService.error(error, false);
            return of([]);
        }),
        shareReplay(SHARE_REPLAY_CONF),
    );

    constructor(
        injector: Injector,
        private errorService: ErrorService,
    ) {
        super(injector);
        this.getCountries = () => {
            return this.getCountries().pipe(map((countries) => sortBy(countries, 'id')));
        };
    }
}
