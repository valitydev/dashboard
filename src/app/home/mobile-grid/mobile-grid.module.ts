import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from 'ng-flex-layout';

import { BootstrapIconModule } from '@dsh/components/indicators';

import { BrandModule } from '../brand';

import { MobileGridComponent } from './mobile-grid.component';
import { MobileMenuModule } from './mobile-menu';

@NgModule({
    imports: [
        CommonModule,
        MatSidenavModule,
        BrandModule,
        FlexLayoutModule,
        MobileMenuModule,
        BootstrapIconModule,
    ],
    declarations: [MobileGridComponent],
    exports: [MobileGridComponent],
})
export class MobileGridModule {}
