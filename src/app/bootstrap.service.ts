import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, throwError, switchMap } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { ShopsDataService, ErrorService, CommonError } from '@dsh/app/shared';

@Injectable()
export class BootstrapService {
    bootstrapped$: Observable<boolean> = this.shopsDataService.shops$.pipe(
        catchError((err) =>
            this.transloco.selectTranslate<string>('app.errors.bootstrapAppFailed', null, 'components').pipe(
                tap((msg) => this.errorService.error(new CommonError(msg))),
                switchMap(() => throwError(err))
            )
        ),

        map(() => true)
    );

    constructor(
        private shopsDataService: ShopsDataService,
        private transloco: TranslocoService,
        private errorService: ErrorService
    ) {}
}
