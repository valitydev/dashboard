import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { combineLatest, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { WalletsService } from '@dsh/app/api/wallet';

import { SectionLink } from './types';

@Injectable()
export class SectionsLinksService {
    sectionLinks$: Observable<SectionLink[]> = combineLatest([
        this.walletsService.wallets$.pipe(map((wallets) => !!wallets.length)),
        // this.roleAccessService.isAccessAllowed([RoleAccessName.Claims]),
        this.transloco.selectTranslation('services'),
    ]).pipe(
        map(([hasWallets]) =>
            [
                {
                    label: this.transloco.translate(
                        'sectionsLinks.links.payments',
                        null,
                        'services',
                    ),
                    path: `/payment-section`,
                },
                hasWallets && {
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
        shareReplay({ refCount: true, bufferSize: 1 }),
    );

    constructor(
        private walletsService: WalletsService,
        private transloco: TranslocoService,
    ) {}
}
