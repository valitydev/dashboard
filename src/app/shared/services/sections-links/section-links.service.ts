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
        this.transloco.selectTranslateObject<{ [k: string]: string }>('sectionLinks'),
        this.walletsService.hasWallets$,
    ]).pipe(
        map((v) => createLinks(...v)),
        first()
    );

    constructor(private walletsService: WalletsService, private transloco: TranslocoService) {}
}
