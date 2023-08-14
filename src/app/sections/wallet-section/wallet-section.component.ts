import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, Subject } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { NavbarItemConfig, toNavbarItemConfig } from './utils';

@Component({
    templateUrl: 'wallet-section.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletSectionComponent implements OnInit {
    navbarItemConfig$: Observable<NavbarItemConfig[]> = this.transloco
        .selectTranslation('wallet-section')
        .pipe(map(() => toNavbarItemConfig(this.getNavbarLabels())));
    activeSection$: Observable<string>;

    private activeSectionChange$ = new Subject<NavbarItemConfig>();

    constructor(private transloco: TranslocoService) {}

    ngOnInit(): void {
        this.activeSection$ = this.activeSectionChange$.pipe(pluck('label'));
    }

    setActiveSection(isActive: boolean, config: NavbarItemConfig): void {
        if (!isActive) {
            return;
        }
        this.activeSectionChange$.next(config);
    }

    private getNavbarLabels() {
        return {
            reports: this.transloco.translate('walletSection.nav.reports', null, 'wallet-section'),
            wallets: this.transloco.translate('walletSection.nav.wallets', null, 'wallet-section'),
            deposits: this.transloco.translate(
                'walletSection.nav.deposits',
                null,
                'wallet-section',
            ),
            withdrawals: this.transloco.translate(
                'walletSection.nav.withdrawals',
                null,
                'wallet-section',
            ),
            integrations: this.transloco.translate(
                'walletSection.nav.integrations',
                null,
                'wallet-section',
            ),
        };
    }
}
