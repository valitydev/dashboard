import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { RouteNavbarLayoutModule } from '@dsh/app/shared/components/route-navbar-layout';
import { NavbarItemModule } from '@dsh/components/navigation';

import { StatusToColorPipe } from './status-to-color.pipe';
import { WalletSectionRoutingModule } from './wallet-section-routing.module';
import { WalletSectionComponent } from './wallet-section.component';

@NgModule({
    imports: [
        CommonModule,
        WalletSectionRoutingModule,
        MatIconModule,
        FlexLayoutModule,
        TranslocoModule,
        RouteNavbarLayoutModule,
        NavbarItemModule,
    ],
    declarations: [WalletSectionComponent, StatusToColorPipe],
    exports: [StatusToColorPipe],
    providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'wallet-section' }],
})
export class WalletSectionModule {}
