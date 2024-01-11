import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { PaymentDetailHeaderComponent } from './payment-detail-header.component';

@NgModule({
    imports: [CommonModule, TranslocoModule, FlexLayoutModule],
    declarations: [PaymentDetailHeaderComponent],
    exports: [PaymentDetailHeaderComponent],
})
export class PaymentDetailHeaderModule {}
