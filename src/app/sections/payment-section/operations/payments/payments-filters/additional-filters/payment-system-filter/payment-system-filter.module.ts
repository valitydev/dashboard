import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexModule } from 'ng-flex-layout';

import { ExpandableRadioGroupModule } from '@dsh/app/shared/components/radio-buttons/expandable-radio-group';

import { PaymentSystemFilterComponent } from './payment-system-filter.component';

@NgModule({
    declarations: [PaymentSystemFilterComponent],
    exports: [PaymentSystemFilterComponent],
    imports: [CommonModule, TranslocoModule, FlexModule, ExpandableRadioGroupModule],
})
export class PaymentSystemFilterModule {}
