import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FlexLayoutModule } from 'ng-flex-layout';

import { BootstrapIconModule } from '../../indicators';

import { NavbarItemComponent } from './navbar-item.component';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatIconModule,
        MatSlideToggleModule,
        BootstrapIconModule,
    ],
    declarations: [NavbarItemComponent],
    exports: [NavbarItemComponent],
})
export class NavbarItemModule {}
