import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { AmountCurrencyModule, ApiModelRefsModule, ApiModelTypesModule } from '@dsh/app/shared';
import { StatusModule } from '@dsh/components/indicators';
import { LastUpdatedModule } from '@dsh/components/indicators/last-updated/last-updated.module';
import { LayoutModule } from '@dsh/components/layout';

import {
    WithdrawalDetailsComponent,
    WithdrawalRowComponent,
    WithdrawalRowHeaderComponent,
} from './components';
import { WithdrawalErrorMessagePipe } from './components/withdrawal-details/pipes/withdrawal-error-message.pipe';
import { WithdrawalsListComponent } from './withdrawals-list.component';

@NgModule({
    imports: [
        TranslocoModule,
        MatSnackBarModule,
        LayoutModule,
        FlexLayoutModule,
        CommonModule,
        LastUpdatedModule,
        ApiModelRefsModule,
        StatusModule,
        ApiModelTypesModule,
        AmountCurrencyModule,
    ],
    declarations: [
        WithdrawalsListComponent,
        WithdrawalRowHeaderComponent,
        WithdrawalRowComponent,
        WithdrawalDetailsComponent,
        WithdrawalErrorMessagePipe,
    ],
    exports: [WithdrawalsListComponent],
})
export class WithdrawalsListModule {}
