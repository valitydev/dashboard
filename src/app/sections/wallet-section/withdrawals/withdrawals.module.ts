import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexModule } from 'ng-flex-layout';

import { EmptySearchResultModule } from '@dsh/components/empty-search-result';
import { SpinnerModule } from '@dsh/components/indicators';
import { ScrollUpModule } from '@dsh/components/navigation';
import { ShowMorePanelModule } from '@dsh/components/show-more-panel';

import { WithdrawalsFiltersModule } from './withdrawals-filters';
import { WithdrawalsListModule } from './withdrawals-list';
import { WithdrawalsRoutingModule } from './withdrawals-routing.module';
import { WithdrawalsComponent } from './withdrawals.component';

@NgModule({
    imports: [
        WithdrawalsRoutingModule,
        CommonModule,
        ScrollUpModule,
        TranslocoModule,
        FlexModule,
        WithdrawalsListModule,
        ShowMorePanelModule,
        SpinnerModule,
        WithdrawalsFiltersModule,
        EmptySearchResultModule,
    ],
    declarations: [WithdrawalsComponent],
})
export class WithdrawalsModule {}
