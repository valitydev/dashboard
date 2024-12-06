import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { AuthModule } from '@dsh/app/auth';
import { ShopCreationModule } from '@dsh/app/shared/components/shop-creation';

import { FetchShopsService } from './services/fetch-shops/fetch-shops.service';
import { ShopsBalanceService } from './services/shops-balance/shops-balance.service';
import { ShopsFiltersService } from './services/shops-filters/shops-filters.service';
import { ShopsFiltersStoreService } from './services/shops-filters-store/shops-filters-store.service';
import { ShopsExpandedIdManagerService } from './shops-list/services/shops-expanded-id-manager/shops-expanded-id-manager.service';
import { ShopListModule } from './shops-list/shop-list.module';
import { ShopsRoutingModule } from './shops-routing.module';
import { ShopsComponent } from './shops.component';

@NgModule({
    imports: [
        ShopsRoutingModule,
        FlexLayoutModule,
        CommonModule,
        RouterModule,
        ShopListModule,
        ShopCreationModule,
        MatButtonModule,
        TranslocoModule,
        AuthModule,
    ],
    declarations: [ShopsComponent],
    exports: [ShopsComponent],
    providers: [
        FetchShopsService,
        ShopsBalanceService,
        ShopsExpandedIdManagerService,
        ShopsFiltersService,
        ShopsFiltersStoreService,
    ],
})
export class ShopsModule {}
