import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { FlexModule, GridModule } from 'ng-flex-layout';

import { AmountCurrencyModule } from '@dsh/app/shared';
import { DetailsItemModule } from '@dsh/components/layout';

import { WalletsAccountInfoComponent } from './wallets-account-info.component';

@NgModule({
    imports: [
        CommonModule,
        FlexModule,
        DetailsItemModule,
        TranslocoModule,
        GridModule,
        AmountCurrencyModule,
    ],
    declarations: [WalletsAccountInfoComponent],
    exports: [WalletsAccountInfoComponent],
})
export class WalletsAccountInfoModule {}
