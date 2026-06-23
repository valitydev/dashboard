import { FlexModule } from 'ng-flex-layout';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApiModelTypesModule } from '@dsh/app/shared';
import { RadioButtonsModule } from '@dsh/app/shared/components/radio-buttons';
import { TranslocoModule } from '@jsverse/transloco';

import { DepositStatusFilterComponent } from './deposit-status-filter.component';

@NgModule({
    declarations: [DepositStatusFilterComponent],
    imports: [FlexModule, CommonModule, TranslocoModule, RadioButtonsModule, ApiModelTypesModule],
    exports: [DepositStatusFilterComponent],
})
export class DepositStatusFilterModule {}
