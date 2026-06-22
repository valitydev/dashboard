import { FlexModule } from 'ng-flex-layout';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AmountCurrencyModule } from '@dsh/app/shared/pipes';
import { DetailsItemModule } from '@dsh/components/layout';
import { TranslocoModule } from '@jsverse/transloco';

import { StatusToColorPipe } from './status-to-color.pipe';
import { WithdrawalInfoComponent } from './withdrawal-info.component';

/**
 * @deprecated have to delete after redesign
 */
@NgModule({
    imports: [CommonModule, FlexModule, DetailsItemModule, TranslocoModule, AmountCurrencyModule],
    declarations: [WithdrawalInfoComponent, StatusToColorPipe],
    exports: [WithdrawalInfoComponent],
})
export class WithdrawalInfoModule {}
