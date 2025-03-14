import { Component, Inject, Input, Optional, booleanAttribute } from '@angular/core';
import { FormControlSuperclass, Option, createControlProviders } from '@vality/matez';
import { Shop } from '@vality/swag-payments';
import { Observable, defer } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { toLiveShops } from '@dsh/app/api/payments';
import { ShopsDataService } from '@dsh/app/shared';

import { SHOPS } from './shops-token';
import { shopToOption } from './utils/shops-to-options';

@Component({
    selector: 'dsh-shop-field',
    templateUrl: 'shop-field.component.html',
    providers: createControlProviders(() => ShopFieldComponent),
    standalone: false,
})
export class ShopFieldComponent extends FormControlSuperclass<Shop> {
    @Input() label: string;
    @Input({ transform: booleanAttribute }) required = false;

    options$: Observable<Option<Shop>[]> = defer(
        () => this.shops$ || this.shopsDataService.shops$.pipe(map(toLiveShops)),
    ).pipe(
        map((shops) => shops.map(shopToOption)),
        shareReplay({ refCount: true, bufferSize: 1 }),
    );

    constructor(
        private shopsDataService: ShopsDataService,
        @Inject(SHOPS)
        @Optional()
        private shops$?: Observable<Shop[]>,
    ) {
        super();
    }
}
