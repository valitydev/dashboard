import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule, GridModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoModule } from '@ngneat/transloco';

import { ApiModelTypesModule, AmountCurrencyModule } from '@dsh/app/shared';
import { ButtonModule } from '@dsh/components/buttons';
import { StatusModule, TextColorModule } from '@dsh/components/indicators';
import {
    AccordionModule,
    CollapseModule,
    DetailsItemModule,
    RowModule,
} from '@dsh/components/layout';
import { ShowMorePanelModule } from '@dsh/components/show-more-panel';

import { WalletWithdrawalDetailsComponent } from './components';
import { WalletWithdrawalsComponent } from './wallet-withdrawals.component';

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
        ButtonModule,
        AmountCurrencyModule,
    ],
    declarations: [WalletWithdrawalsComponent, WalletWithdrawalDetailsComponent],
    exports: [WalletWithdrawalsComponent],
})
export class WalletWithdrawalsModule {}
