import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { concat, defer, Observable, of, ReplaySubject, throwError, retry, timer } from 'rxjs';
import { catchError, first, shareReplay, switchMap, takeLast, tap, map } from 'rxjs/operators';

import { ClaimsService, createTestShopClaimChangeset } from '@dsh/api/claim-management';
import { OrgsService } from '@dsh/api/organizations';
import {
    ShopsDataService,
    CommonError,
    ErrorService,
    IdGeneratorService,
    ContextOrganizationService,
} from '@dsh/app/shared';

@UntilDestroy()
@Injectable()
export class BootstrapService {
    bootstrapped$: Observable<boolean> = defer(() => this.bootstrap$).pipe(
        switchMap(() => this.getBootstrapped()),
        untilDestroyed(this),
        shareReplay(1)
    );

    private bootstrap$ = new ReplaySubject<void>(1);

    constructor(
        private shopsDataService: ShopsDataService,
        private claimsService: ClaimsService,
        private errorService: ErrorService,
        private organizationsService: OrgsService,
        private transloco: TranslocoService,
        private idGenerator: IdGeneratorService,
        private contextOrganizationService: ContextOrganizationService
    ) {}

    bootstrap(): void {
        this.bootstrap$.next();
    }

    private getBootstrapped(): Observable<boolean> {
        return concat(
            this.contextOrganizationService.organization$.pipe(
                first(),
                map(() => true)
            ),
            this.initShop()
        ).pipe(
            takeLast(1),
            catchError((err) =>
                this.transloco.selectTranslate<string>('app.errors.bootstrapAppFailed', null, 'components').pipe(
                    tap((msg) => this.errorService.error(new CommonError(msg))),
                    switchMap(() => throwError(err))
                )
            )
        );
    }

    private initShop(): Observable<boolean> {
        return this.shopsDataService.shops$.pipe(
            first(),
            switchMap((shops) =>
                shops.length
                    ? of(true)
                    : this.createTestShop().pipe(
                          switchMap(() =>
                              timer(1000).pipe(
                                  switchMap(() => this.shopsDataService.reloadShops()),
                                  switchMap((shops) => {
                                      if (!shops.length) return throwError(() => 'Shops are not initialized');
                                      return of(shops);
                                  }),
                                  retry(3)
                              )
                          ),
                          map(() => true),
                          catchError(() => of(true))
                      )
            )
        );
    }

    private createTestShop(): Observable<boolean> {
        return this.claimsService.searchClaims({ limit: 1 }).pipe(
            switchMap((claims) =>
                claims.result.length
                    ? of(true)
                    : this.claimsService
                          .createClaim({
                              changeset: createTestShopClaimChangeset(
                                  this.idGenerator.uuid(),
                                  this.idGenerator.uuid(),
                                  this.idGenerator.uuid(),
                                  this.idGenerator.uuid()
                              ),
                          })
                          .pipe(map(() => true))
            )
        );
    }
}
