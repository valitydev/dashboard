import { FlexLayoutModule } from 'ng-flex-layout';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

import { PaymentDetailHeaderComponent } from './payment-detail-header.component';

@NgModule({
    imports: [CommonModule, TranslocoModule, FlexLayoutModule],
    declarations: [PaymentDetailHeaderComponent],
    exports: [PaymentDetailHeaderComponent],
})
export class PaymentDetailHeaderModule {}
