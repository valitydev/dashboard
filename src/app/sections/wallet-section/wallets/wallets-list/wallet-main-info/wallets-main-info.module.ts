import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexModule, GridModule } from 'ng-flex-layout';

import { AmountCurrencyModule } from '@dsh/app/shared';
import { SpinnerModule } from '@dsh/components/indicators';
import { DetailsItemModule } from '@dsh/components/layout';

import { WalletsMainInfoComponent } from './wallets-main-info.component';

@NgModule({
    imports: [
        CommonModule,
        FlexModule,
        DetailsItemModule,
        TranslocoModule,
        AmountCurrencyModule,
        SpinnerModule,
        GridModule,
    ],
    declarations: [WalletsMainInfoComponent],
    exports: [WalletsMainInfoComponent],
})
export class WalletsMainInfoModule {}
