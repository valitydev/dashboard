import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { AmountCurrencyModule } from '@dsh/app/shared/pipes';
import { StatusModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { RefundDetailsComponent } from './refund-details.component';
import { RefundStatusColorPipe } from './refund-status-color.pipe';

@NgModule({
    imports: [
        TranslocoModule,
        LayoutModule,
        FlexLayoutModule,
        CommonModule,
        StatusModule,
        AmountCurrencyModule,
    ],
    declarations: [RefundDetailsComponent, RefundStatusColorPipe],
    exports: [RefundDetailsComponent, RefundStatusColorPipe],
})
export class RefundDetailsModule {}
