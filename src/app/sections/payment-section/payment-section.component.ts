import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { PaymentInstitution } from '@vality/swag-payments';
import { Observable, ReplaySubject, Subject, combineLatest, defer } from 'rxjs';
import { filter, first, map, switchMapTo } from 'rxjs/operators';

import { SHOPS } from '@dsh/app/shared/components/inputs/shop-field';

import { PaymentInstitutionRealmService, RealmShopsService } from './services';
import { NavbarItemConfig, toNavbarItemConfig } from './utils';

@Component({
    templateUrl: 'payment-section.component.html',
    providers: [
        PaymentInstitutionRealmService,
        RealmShopsService,
        {
            provide: SHOPS,
            deps: [RealmShopsService],
            useFactory: (realmShopsService: RealmShopsService) => realmShopsService.shops$,
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class PaymentSectionComponent implements OnInit {
    isTestRealm$ = this.realmService.realm$.pipe(
        map((realm) => realm === PaymentInstitution.RealmEnum.Test),
    );
    navbarItemConfig$: Observable<NavbarItemConfig[]> = this.transloco
        .selectTranslation('payment-section')
        .pipe(map(() => toNavbarItemConfig(this.getNavbarItemLabels())));
    activeSection$ = defer(() => this.activeSectionChange$).pipe(map((s) => s.label));
    noShops$: Observable<boolean> = this.realmShopsService.shops$.pipe(map((s) => s.length === 0));

    private activeSectionChange$ = new ReplaySubject<NavbarItemConfig>();
    private realmChange$ = new Subject<PaymentInstitution.RealmEnum>();
    private navigateToShops$ = new Subject<void>();

    constructor(
        private realmService: PaymentInstitutionRealmService,
        private router: Router,
        private route: ActivatedRoute,
        private transloco: TranslocoService,
        private realmShopsService: RealmShopsService,
        private dr: DestroyRef,
    ) {}

    ngOnInit(): void {
        this.realmService.realm$
            .pipe(
                filter((realm) => !realm),
                takeUntilDestroyed(this.dr),
            )
            .subscribe(
                () =>
                    void this.router.navigate(['realm', PaymentInstitution.RealmEnum.Live], {
                        relativeTo: this.route,
                    }),
            );

        combineLatest([this.activeSectionChange$, this.realmChange$])
            .pipe(takeUntilDestroyed(this.dr))
            .subscribe(
                ([{ routerLink }, realm]) =>
                    void this.router.navigate(['../../', 'realm', realm, routerLink], {
                        relativeTo: this.route,
                        queryParamsHandling: 'preserve',
                    }),
            );

        this.navigateToShops$.pipe(switchMapTo(this.realmService.realm$.pipe(first()))).subscribe(
            (realm) =>
                void this.router.navigate(['../../', 'realm', realm, 'shops'], {
                    relativeTo: this.route,
                }),
        );
    }

    setActiveSection(isActive: boolean, config: NavbarItemConfig): void {
        if (!isActive) {
            return;
        }
        this.activeSectionChange$.next(config);
    }

    testEnvToggle(isTestEnv: boolean): void {
        const realm = isTestEnv
            ? PaymentInstitution.RealmEnum.Test
            : PaymentInstitution.RealmEnum.Live;
        this.realmChange$.next(realm);
    }

    navigateToShops(): void {
        this.navigateToShops$.next();
    }

    private getNavbarItemLabels() {
        return {
            shops: this.transloco.translate('paymentSection.nav.shops', null, 'payment-section'),
            analytics: this.transloco.translate(
                'paymentSection.nav.analytics',
                null,
                'payment-section',
            ),
            integrations: this.transloco.translate(
                'paymentSection.nav.integrations',
                null,
                'payment-section',
            ),
            operations: this.transloco.translate(
                'paymentSection.nav.operations',
                null,
                'payment-section',
            ),
            payouts: this.transloco.translate(
                'paymentSection.nav.payouts',
                null,
                'payment-section',
            ),
            reports: this.transloco.translate(
                'paymentSection.nav.reports',
                null,
                'payment-section',
            ),
        };
    }
}
