import { ChangeDetectionStrategy, Component, Injector, Input } from '@angular/core';
import { createControlProviders } from '@vality/ng-core';
import { Shop } from '@vality/swag-payments';
import { combineLatest } from 'rxjs';
import { map, share } from 'rxjs/operators';

import { ShopsDataService } from '@dsh/app/shared';
import { FilterSuperclass } from '@dsh/components/filter';

@Component({
    selector: 'dsh-shops-filter',
    templateUrl: 'shops-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => ShopsFilterComponent),
    standalone: false,
})
export class ShopsFilterComponent extends FilterSuperclass<Shop['id'][]> {
    @Input() shops: Shop[];

    labels$ = combineLatest([this.savedValue$, this.shopsDataService.shops$]).pipe(
        map(([selectedShopIds, shops]) =>
            (selectedShopIds || []).map(
                (id) => shops.find((s) => s.id === id)?.details?.name || id,
            ),
        ),
        share(),
    );

    constructor(
        injector: Injector,
        private shopsDataService: ShopsDataService,
    ) {
        super(injector);
    }
}
