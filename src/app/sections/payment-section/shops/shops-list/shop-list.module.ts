import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { EmptySearchResultModule } from '@dsh/components/empty-search-result';
import { SpinnerModule } from '@dsh/components/indicators';
import { LastUpdatedModule } from '@dsh/components/indicators/last-updated/last-updated.module';
import { AccordionModule, CardModule, RowModule } from '@dsh/components/layout';
import { ShowMorePanelModule } from '@dsh/components/show-more-panel';

import { ShopRowComponent } from './components/shop-row/shop-row.component';
import { ShopRowHeaderComponent } from './components/shop-row-header/shop-row-header.component';
import { ShopBalanceModule } from './shop-balance';
import { ShopDetailsModule } from './shop-details';
import { ShopsListComponent } from './shops-list.component';

@NgModule({
    imports: [
        CommonModule,
        LastUpdatedModule,
        AccordionModule,
        CardModule,
        RowModule,

        ShowMorePanelModule,
        EmptySearchResultModule,
        SpinnerModule,
        ShopDetailsModule,
        FlexLayoutModule,
        TranslocoModule,
        ShopBalanceModule,
    ],
    declarations: [ShopsListComponent, ShopRowHeaderComponent, ShopRowComponent],
    exports: [ShopsListComponent, ShopRowComponent],
})
export class ShopListModule {}
