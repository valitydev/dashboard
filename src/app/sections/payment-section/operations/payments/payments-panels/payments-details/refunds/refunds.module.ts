import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { AuthModule } from '@dsh/app/auth';
import { ButtonModule } from '@dsh/components/buttons';

import { CreateRefundModule } from './create-refund';
import { RefundsListModule } from './refunds-list';
import { RefundsComponent } from './refunds.component';

@NgModule({
    imports: [
        CommonModule,
        TranslocoModule,
        FlexLayoutModule,
        ButtonModule,
        CreateRefundModule,
        RefundsListModule,
        AuthModule,
    ],
    declarations: [RefundsComponent],
    exports: [RefundsComponent],
})
export class RefundsModule {}
