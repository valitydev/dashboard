import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { take } from 'rxjs/operators';

import { ShopCreationService } from '@dsh/app/shared/components/shop-creation';

import { PaymentInstitutionRealmService, RealmShopsService } from '../services';

import { FetchShopsService } from './services/fetch-shops/fetch-shops.service';
import { ShopsExpandedIdManagerService } from './shops-list/services/shops-expanded-id-manager/shops-expanded-id-manager.service';

@Component({
    selector: 'dsh-shops',
    templateUrl: 'shops.component.html',
    styleUrls: ['shops.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ShopsComponent implements OnInit {
    shops$ = this.shopsService.shownShops$;
    isLoading$ = this.shopsService.isLoading$;
    lastUpdated$ = this.shopsService.lastUpdated$;
    hasMore$ = this.shopsService.hasMore$;

    constructor(
        private shopsService: FetchShopsService,
        private expandedIdManager: ShopsExpandedIdManagerService,
        private createShopService: ShopCreationService,
        private realmShopsService: RealmShopsService,
        private realmService: PaymentInstitutionRealmService,
        private dr: DestroyRef,
    ) {}

    ngOnInit(): void {
        this.realmService.realm$.pipe(takeUntilDestroyed(this.dr)).subscribe((realm) => {
            this.shopsService.initRealm(realm);
        });
        this.expandedIdManager.expandedId$.pipe(take(1)).subscribe((offsetIndex: number) => {
            this.shopsService.initOffsetIndex(offsetIndex);
        });
    }

    createShop(): void {
        this.createShopService.createShop({ shops$: this.realmShopsService.shops$ });
    }

    refreshData(): void {
        this.shopsService.refreshData();
    }

    showMore(): void {
        this.shopsService.showMore();
    }
}
