import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoModule } from '@ngneat/transloco';
import { FlexModule } from 'ng-flex-layout';

import { DepositRevertDetailsModule } from '@dsh/app/shared';
import { ButtonModule } from '@dsh/components/buttons';
import { IndicatorsModule } from '@dsh/components/indicators';
import { ShowMorePanelModule } from '@dsh/components/show-more-panel';

import { DepositRevertsComponent } from './deposit-reverts.component';

@NgModule({
    declarations: [DepositRevertsComponent],
    imports: [
        FlexModule,
        CommonModule,
        ShowMorePanelModule,
        IndicatorsModule,
        MatDividerModule,
        DepositRevertDetailsModule,
        TranslocoModule,
        ButtonModule,
    ],
    exports: [DepositRevertsComponent],
})
export class DepositRevertsModule {}
