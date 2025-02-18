import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, pluck, take } from 'rxjs/operators';

import { ThemeManager } from '../theme-manager';

@Component({
    selector: 'dsh-home',
    templateUrl: 'home.component.html',
    standalone: false
})
export class HomeComponent implements OnInit {
    routerNavigationEnd$: Observable<boolean>;
    isXSmallSmall$: Observable<boolean>;

    constructor(
        private router: Router,
        // need to create class when home component was init
        private themeManager: ThemeManager,
        private breakpointObserver: BreakpointObserver,
        private dr: DestroyRef,
    ) {}

    ngOnInit(): void {
        this.routerNavigationEnd$ = this.router.events.pipe(
            filter((event) => event instanceof NavigationEnd),
            map(() => true),
            take(1),
            takeUntilDestroyed(this.dr),
        );
        this.isXSmallSmall$ = this.breakpointObserver
            .observe([Breakpoints.XSmall, Breakpoints.Small])
            .pipe(pluck('matches'));
    }
}
