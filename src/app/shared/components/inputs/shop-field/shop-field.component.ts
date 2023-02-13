import { ChangeDetectionStrategy, Component, Inject, Injector, Input, Optional } from '@angular/core';
import { provideValueAccessor, WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { Shop } from '@vality/swag-payments';
import { defer, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ShopsDataService, toLiveShops } from '@dsh/api/payments';
import { shopToOption } from '@dsh/app/shared/components/inputs/shop-field/utils/shops-to-options';
import { Option } from '@dsh/components/form-controls/select-search-field';
import { shareReplayRefCount } from '@dsh/operators';
import { coerceBoolean } from '@dsh/utils';

import { SHOPS } from './shops-token';

@Component({
    selector: 'dsh-shop-field',
    templateUrl: 'shop-field.component.html',
    providers: [provideValueAccessor(ShopFieldComponent)],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopFieldComponent extends WrappedFormControlSuperclass<Shop> {
    @Input() label: string;
    @Input() @coerceBoolean required = false;

    options$: Observable<Option<Shop>[]> = defer(
        () => this.shops$ || this.shopsDataService.shops$.pipe(map(toLiveShops))
    ).pipe(
        map((shops) => shops.map(shopToOption)),
        shareReplayRefCount()
    );

    constructor(
        injector: Injector,
        private shopsDataService: ShopsDataService,
        @Inject(SHOPS)
        @Optional()
        private shops$?: Observable<Shop[]>
    ) {
        super(injector);
    }
}
