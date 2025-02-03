import { Component, Inject, ViewChild } from '@angular/core';
import { MatDrawer, MatDrawerToggleResult } from '@angular/material/sidenav';

import { BRAND_NAME } from '@dsh/app/sections/tokens';

@Component({
    selector: 'dsh-mobile-grid',
    templateUrl: './mobile-grid.component.html',
    styleUrls: ['./mobile-grid.component.scss'],
})
export class MobileGridComponent {
    @ViewChild(MatDrawer) drawer: MatDrawer;

    constructor(@Inject(BRAND_NAME) public brandName: string) {}

    openSideNav(): Promise<MatDrawerToggleResult> {
        return this.drawer.open('program');
    }

    closeSideNav(): Promise<MatDrawerToggleResult> {
        return this.drawer.close();
    }
}
