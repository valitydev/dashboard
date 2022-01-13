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
        .selectTranslateObject<{ [k: string]: string }>('nav', {}, 'wallet-section')
        .pipe(map(toNavbarItemConfig));
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
}
