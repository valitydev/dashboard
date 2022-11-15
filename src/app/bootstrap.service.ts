import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Organization } from '@vality/swag-organizations';
import { concat, defer, Observable, of, ReplaySubject, throwError } from 'rxjs';
import { catchError, first, mapTo, shareReplay, switchMap, takeLast, tap, map } from 'rxjs/operators';

import { ClaimsService, createTestShopClaimChangeset } from '@dsh/api/claim-management';
import { DEFAULT_ORGANIZATION_NAME, OrgsService } from '@dsh/api/organizations';
import { ShopsService } from '@dsh/api/payments';
import { CommonError, ErrorService, IdGeneratorService } from '@dsh/app/shared';

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
        private shopService: ShopsService,
        private claimsService: ClaimsService,
        private errorService: ErrorService,
        private organizationsService: OrgsService,
        private transloco: TranslocoService,
        private idGenerator: IdGeneratorService
    ) {}

    bootstrap(): void {
        this.bootstrap$.next();
    }

    private getBootstrapped(): Observable<boolean> {
        return concat(this.initOrganization(), this.initShop()).pipe(
            takeLast(1),
            catchError((err) =>
                this.transloco.selectTranslate<string>('app.errors.bootstrapAppFailed', null, 'components').pipe(
                    tap((msg) => this.errorService.error(new CommonError(msg))),
                    switchMap(() => throwError(err))
                )
            )
        );
    }

    private initOrganization(): Observable<boolean> {
        return this.organizationsService.listOrgMembership({ limit: 1 }).pipe(
            first(),
            switchMap((orgs) => (orgs.result.length ? of(true) : this.createOrganization())),
            catchError((err) => {
                this.errorService.error(err, false);
                return of(true);
            })
        );
    }

    private createOrganization(): Observable<boolean> {
        return this.organizationsService
            .createOrg({ organization: { name: DEFAULT_ORGANIZATION_NAME } as Organization })
            .pipe(mapTo(true));
    }

    private initShop(): Observable<boolean> {
        return this.shopService.shops$.pipe(
            first(),
            switchMap((shops) =>
                shops.length ? of(true) : this.createTestShop().pipe(tap(() => this.shopService.reloadShops()))
            )
        );
    }

    private createTestShop(): Observable<boolean> {
        return this.claimsService
            .createClaim({
                changeset: createTestShopClaimChangeset(
                    this.idGenerator.uuid(),
                    this.idGenerator.uuid(),
                    this.idGenerator.uuid(),
                    this.idGenerator.uuid()
                ),
            })
            .pipe(map(() => true));
    }
}
