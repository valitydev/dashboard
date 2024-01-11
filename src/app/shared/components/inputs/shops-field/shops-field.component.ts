import { Component, Input, OnChanges } from '@angular/core';
import { FormControlSuperclass, createControlProviders, ComponentChanges } from '@vality/ng-core';
import { Shop } from '@vality/swag-payments';
import { defer, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { shareReplayRefCount } from '@dsh/app/custom-operators';

@Component({
    selector: 'dsh-shops-field',
    templateUrl: 'shops-field.component.html',
    providers: createControlProviders(() => ShopsFieldComponent),
})
export class ShopsFieldComponent extends FormControlSuperclass<Shop['id'][]> implements OnChanges {
    @Input() shops: Shop[];

    options$ = defer(() => this.shops$).pipe(
        map((shops) => shops.map((shop) => ({ value: shop.id, label: shop.details.name }))),
        shareReplayRefCount(),
    );

    private shops$ = new ReplaySubject<Shop[]>();

    constructor() {
        super();
    }

    ngOnChanges({ shops }: ComponentChanges<ShopsFieldComponent>): void {
        if (shops) {
            this.shops$.next(shops.currentValue);
        }
    }
}
