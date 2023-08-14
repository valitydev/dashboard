import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { combineLatest, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { WalletsService } from '@dsh/app/api/wallet';
import { RoleAccessName, RoleAccessService } from '@dsh/app/auth';

import { SectionLink } from './types';

@Injectable()
export class SectionsLinksService {
    sectionLinks$: Observable<SectionLink[]> = combineLatest([
        this.walletsService.hasWallets$,
        this.roleAccessService.isAccessAllowed([RoleAccessName.Wallets]),
        // this.roleAccessService.isAccessAllowed([RoleAccessName.Claims]),
        this.transloco.selectTranslation('services'),
    ]).pipe(
        map(([hasWallets, allowWallets]) =>
            [
                {
                    label: this.transloco.translate(
                        'sectionsLinks.links.payments',
                        null,
                        'services',
                    ),
                    path: `/payment-section`,
                },
                hasWallets &&
                    allowWallets && {
                        label: this.transloco.translate(
                            'sectionsLinks.links.wallets',
                            null,
                            'services',
                        ),
                        path: '/wallet-section',
                    },
                // allowClaims && {
                //     label: this.transloco.translate('sectionsLinks.links.claims', null, 'services'),
                //     path: '/claim-section',
                // },
            ].filter(Boolean),
        ),
        first(),
    );

    constructor(
        private walletsService: WalletsService,
        private transloco: TranslocoService,
        private roleAccessService: RoleAccessService,
    ) {}
}
