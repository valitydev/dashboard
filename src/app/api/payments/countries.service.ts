import { Injectable } from '@angular/core';
import { Country, CountriesService as ApiCountriesService } from '@vality/swag-payments';
import sortBy from 'lodash-es/sortBy';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';

import { IdGeneratorService } from '@dsh/app/shared';
import { ErrorService } from '@dsh/app/shared/services';
import { SHARE_REPLAY_CONF } from '@dsh/operators';

@Injectable({
    providedIn: 'root',
})
export class CountriesService {
    countries$: Observable<Country[]> = this.getCountries().pipe(
        catchError((error) => {
            this.errorService.error(error, false);
            return of([]);
        }),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(
        private countriesService: ApiCountriesService,
        private idGenerator: IdGeneratorService,
        private errorService: ErrorService
    ) {}

    getCountries(): Observable<Country[]> {
        return this.countriesService
            .getCountries({ xRequestID: this.idGenerator.shortUuid() })
            .pipe(map((countries) => sortBy(countries, 'id')));
    }
}
