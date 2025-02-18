import { Component, ViewChild } from '@angular/core';
import { MatDrawer, MatDrawerToggleResult } from '@angular/material/sidenav';

@Component({
    selector: 'dsh-mobile-grid',
    templateUrl: './mobile-grid.component.html',
    styleUrls: ['./mobile-grid.component.scss'],
    standalone: false
})
export class MobileGridComponent {
    @ViewChild(MatDrawer) drawer: MatDrawer;

    openSideNav(): Promise<MatDrawerToggleResult> {
        return this.drawer.open('program');
    }

    closeSideNav(): Promise<MatDrawerToggleResult> {
        return this.drawer.close();
    }
}
