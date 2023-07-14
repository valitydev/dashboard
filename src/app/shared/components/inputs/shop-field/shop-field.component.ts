import { Component, Inject, Input, Optional, booleanAttribute } from '@angular/core';
import { createControlProviders, FormControlSuperclass, Option } from '@vality/ng-core';
import { Shop } from '@vality/swag-payments';
import { defer, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { toLiveShops } from '@dsh/app/api/payments';
import { shareReplayRefCount } from '@dsh/app/custom-operators';
import { ShopsDataService } from '@dsh/app/shared';

import { SHOPS } from './shops-token';
import { shopToOption } from './utils/shops-to-options';

@Component({
    selector: 'dsh-shop-field',
    templateUrl: 'shop-field.component.html',
    providers: createControlProviders(() => ShopFieldComponent),
})
export class ShopFieldComponent extends FormControlSuperclass<Shop> {
    @Input() label: string;
    @Input({ transform: booleanAttribute }) required = false;

    options$: Observable<Option<Shop>[]> = defer(
        () => this.shops$ || this.shopsDataService.shops$.pipe(map(toLiveShops))
    ).pipe(
        map((shops) => shops.map(shopToOption)),
        shareReplayRefCount()
    );

    constructor(
        private shopsDataService: ShopsDataService,
        @Inject(SHOPS)
        @Optional()
        private shops$?: Observable<Shop[]>
    ) {
        super();
    }
}
