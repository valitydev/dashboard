import { ChangeDetectionStrategy, Component, Inject, Input, Optional } from '@angular/core';
import { WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { Shop } from '@vality/swag-payments';
import { coerceBoolean } from 'coerce-property';
import { defer, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { toLiveShops } from '@dsh/app/api/payments';
import { shareReplayRefCount } from '@dsh/app/custom-operators';
import { ShopsDataService } from '@dsh/app/shared';
import { shopToOption } from '@dsh/app/shared/components/inputs/shop-field/utils/shops-to-options';
import { Option } from '@dsh/components/form-controls/select-search-field';
import { provideValueAccessor } from '@dsh/utils';

import { SHOPS } from './shops-token';

@Component({
    selector: 'dsh-shop-field',
    templateUrl: 'shop-field.component.html',
    providers: [provideValueAccessor(() => ShopFieldComponent)],
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
        private shopsDataService: ShopsDataService,
        @Inject(SHOPS)
        @Optional()
        private shops$?: Observable<Shop[]>
    ) {
        super();
    }
}
