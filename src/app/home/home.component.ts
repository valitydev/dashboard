import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { filter, map, pluck, take } from 'rxjs/operators';

import { ThemeManager } from '../theme-manager';

@UntilDestroy()
@Component({
    selector: 'dsh-home',
    templateUrl: 'home.component.html',
})
export class HomeComponent implements OnInit {
    routerNavigationEnd$: Observable<boolean>;
    isXSmallSmall$: Observable<boolean>;

    constructor(
        private router: Router,
        // need to create class when home component was init
        private themeManager: ThemeManager,
        private breakpointObserver: BreakpointObserver,
    ) {}

    ngOnInit(): void {
        this.routerNavigationEnd$ = this.router.events.pipe(
            filter((event) => event instanceof NavigationEnd),
            map(() => true),
            take(1),
            untilDestroyed(this),
        );
        this.isXSmallSmall$ = this.breakpointObserver
            .observe([Breakpoints.XSmall, Breakpoints.Small])
            .pipe(pluck('matches'));
    }
}
