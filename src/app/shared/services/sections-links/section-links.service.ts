import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { combineLatest, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { WalletsService } from '@dsh/api/wallet';

import { SectionLink } from './model';
import { createLinks } from './utils';

@Injectable()
export class SectionsLinksService {
    sectionLinks$: Observable<SectionLink[]> = combineLatest([
        this.walletsService.hasWallets$,
        this.transloco.selectTranslation('services'),
    ]).pipe(
        map(([hasWallets]) => createLinks(this.getLabels(), hasWallets)),
        first()
    );

    constructor(private walletsService: WalletsService, private transloco: TranslocoService) {}

    getLabels() {
        return {
            claims: this.transloco.translate('sectionsLinks.links.claims', null, 'services'),
            payments: this.transloco.translate('sectionsLinks.links.payments', null, 'services'),
            wallets: this.transloco.translate('sectionsLinks.links.wallets', null, 'services'),
        };
    }
}
