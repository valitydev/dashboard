import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexModule, GridModule } from 'ng-flex-layout';

import { ApiModelTypesModule, AmountCurrencyModule } from '@dsh/app/shared';
import { StatusModule, TextColorModule } from '@dsh/components/indicators';
import {
    AccordionModule,
    CollapseModule,
    DetailsItemModule,
    RowModule,
} from '@dsh/components/layout';
import { ShowMorePanelModule } from '@dsh/components/show-more-panel';

import { WalletDepositDetailsComponent } from './components';
import { WalletDepositsComponent } from './wallet-deposits.component';

@NgModule({
    imports: [
        CommonModule,
        FlexModule,
        DetailsItemModule,
        TranslocoModule,
        AccordionModule,
        RowModule,
        CollapseModule,
        MatDividerModule,
        TextColorModule,
        GridModule,
        StatusModule,
        ApiModelTypesModule,
        ShowMorePanelModule,
        MatButtonModule,
        AmountCurrencyModule,
    ],
    declarations: [WalletDepositsComponent, WalletDepositDetailsComponent],
    exports: [WalletDepositsComponent],
})
export class WalletDepositsModule {}
