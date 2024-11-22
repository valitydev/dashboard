import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@jsverse/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { AuthModule } from '@dsh/app/auth';
import { RouteNavbarLayoutModule } from '@dsh/app/shared/components/route-navbar-layout';
import { NavbarItemModule } from '@dsh/components/navigation';

import { BalancesModule } from './balances';
import { NoShopsAlertModule } from './no-shops-alert';
import { PaymentSectionRoutingModule } from './payment-section-routing.module';
import { PaymentSectionComponent } from './payment-section.component';

@NgModule({
    imports: [
        CommonModule,
        PaymentSectionRoutingModule,
        MatIconModule,
        FlexLayoutModule,
        TranslocoModule,
        BalancesModule,
        RouteNavbarLayoutModule,
        NavbarItemModule,
        NoShopsAlertModule,
        AuthModule,
    ],
    declarations: [PaymentSectionComponent],
    exports: [PaymentSectionComponent],
    providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'payment-section' }],
})
export class PaymentSectionModule {}
