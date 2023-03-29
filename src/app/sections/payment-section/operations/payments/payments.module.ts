import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { NotificationModule } from '@dsh/app/shared/services';
import { LastUpdatedModule } from '@dsh/components/indicators/last-updated/last-updated.module';

import { DEFAULT_PAYMENTS_UPDATE_DELAY, PAYMENTS_UPDATE_DELAY_TOKEN } from './consts';
import { PaymentsFiltersModule } from './payments-filters';
import { PaymentsPanelsModule } from './payments-panels';
import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsComponent } from './payments.component';

@NgModule({
    imports: [
        CommonModule,
        PaymentsRoutingModule,
        PaymentsFiltersModule,
        LastUpdatedModule,
        PaymentsPanelsModule,
        FlexLayoutModule,
        NotificationModule,
        MatDialogModule,
    ],
    declarations: [PaymentsComponent],
    providers: [
        { provide: SEARCH_LIMIT, useValue: 10 },
        { provide: PAYMENTS_UPDATE_DELAY_TOKEN, useValue: DEFAULT_PAYMENTS_UPDATE_DELAY },
    ],
})
export class PaymentsModule {}
