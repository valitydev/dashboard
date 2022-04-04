import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { concat, defer, Observable, of, ReplaySubject, throwError } from 'rxjs';
import { catchError, first, mapTo, shareReplay, switchMap, takeLast, tap } from 'rxjs/operators';

import { ApiShopsService, DEFAULT_ORGANIZATION_NAME, OrganizationsService } from '@dsh/api';
import { ClaimsService, createTestShopClaimChangeset } from '@dsh/api/claim-management';
import { PartiesService } from '@dsh/api/payments';
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
        private shopService: ApiShopsService,
        private claimsService: ClaimsService,
        private partiesService: PartiesService,
        private errorService: ErrorService,
        private organizationsService: OrganizationsService,
        private transloco: TranslocoService,
        private idGenerator: IdGeneratorService
    ) {}

    bootstrap(): void {
        this.bootstrap$.next();
    }

    private getBootstrapped(): Observable<boolean> {
        return concat(this.initParty(), this.initShop(), this.initOrganization()).pipe(
            takeLast(1),
            catchError((err) => {
                this.errorService.error(new CommonError(this.transloco.translate('errors.bootstrapAppFailed')));
                return throwError(err);
            })
        );
    }

    private initParty(): Observable<boolean> {
        return this.partiesService.getMyParty().pipe(mapTo(true));
    }

    private initOrganization(): Observable<boolean> {
        return this.organizationsService.listOrgMembership(1).pipe(
            first(),
            switchMap((orgs) => (orgs.result.length ? of(true) : this.createOrganization())),
            catchError((err) => {
                this.errorService.error(err, false);
                return of(true);
            })
        );
    }

    private createOrganization(): Observable<boolean> {
        return this.organizationsService.createOrg({ name: DEFAULT_ORGANIZATION_NAME }).pipe(mapTo(true));
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
            .createClaim(
                createTestShopClaimChangeset(
                    this.idGenerator.uuid(),
                    this.idGenerator.uuid(),
                    this.idGenerator.uuid(),
                    this.idGenerator.uuid()
                )
            )
            .pipe(mapTo(true));
    }
}
