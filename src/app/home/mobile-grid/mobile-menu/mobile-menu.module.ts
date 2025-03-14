import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexModule } from 'ng-flex-layout';

import { SectionsLinksModule } from '@dsh/app/shared/services/sections-links';
import { BootstrapIconModule } from '@dsh/components/indicators';

import { MobileUserBarComponent, NavItemComponent } from './components';
import { MobileMenuComponent } from './mobile-menu.component';

@NgModule({
    imports: [
        CommonModule,
        MatDividerModule,
        FlexModule,
        SectionsLinksModule,
        RouterModule,
        TranslocoModule,
        BootstrapIconModule,
    ],
    declarations: [MobileMenuComponent, NavItemComponent, MobileUserBarComponent],
    exports: [MobileMenuComponent],
})
export class MobileMenuModule {}
