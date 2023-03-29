import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';

import { BootstrapIconModule } from '../../indicators';
import { NavbarItemComponent } from './navbar-item.component';

@NgModule({
    imports: [CommonModule, FlexLayoutModule, MatIconModule, MatSlideToggleModule, BootstrapIconModule],
    declarations: [NavbarItemComponent],
    exports: [NavbarItemComponent],
})
export class NavbarItemModule {}
