import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { combineLatest, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { SectionsService, AppSection } from '@dsh/app/sections/sections.service';

import { SectionLink } from './types';

@Injectable()
export class SectionsLinksService {
    sectionLinks$: Observable<SectionLink[]> = combineLatest([
        this.sectionsService.allowedMap$,
        // this.roleAccessService.isAccessAllowed([RoleAccessName.Claims]),
        this.transloco.selectTranslation('services'),
    ]).pipe(
        map(([allowedMap]) =>
            [
                allowedMap[AppSection.Payment] && {
                    label: this.transloco.translate(
                        'sectionsLinks.links.payments',
                        null,
                        'services',
                    ),
                    path: `/payment-section`,
                },
                allowedMap[AppSection.Wallet] && {
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
        private sectionsService: SectionsService,
        private transloco: TranslocoService,
    ) {}
}
