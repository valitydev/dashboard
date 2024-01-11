import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from 'ng-flex-layout';

import { SectionHeaderModule } from '@dsh/components/layout';

import { RouteNavbarLayoutComponent } from './route-navbar-layout.component';

@NgModule({
    imports: [CommonModule, RouterModule, FlexLayoutModule, SectionHeaderModule],
    declarations: [RouteNavbarLayoutComponent],
    exports: [RouteNavbarLayoutComponent],
})
export class RouteNavbarLayoutModule {}
