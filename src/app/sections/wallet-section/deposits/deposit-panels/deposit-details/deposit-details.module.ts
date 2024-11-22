import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexModule, GridModule } from 'ng-flex-layout';

import { ApiModelRefsModule, ApiModelTypesModule, AmountCurrencyModule } from '@dsh/app/shared';
import { StatusModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { DepositDetailsComponent } from './deposit-details.component';

@NgModule({
    imports: [
        TranslocoModule,
        FlexModule,
        CommonModule,
        StatusModule,
        LayoutModule,
        ApiModelRefsModule,
        ApiModelTypesModule,

        AmountCurrencyModule,
        GridModule,
    ],
    declarations: [DepositDetailsComponent],
    exports: [DepositDetailsComponent],
})
export class DepositDetailsModule {}
