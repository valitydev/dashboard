import { Component, Input, OnChanges } from '@angular/core';
import { WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { Shop } from '@vality/swag-payments';
import { defer, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { shareReplayRefCount } from '@dsh/app/custom-operators';
import { ComponentChanges } from '@dsh/type-utils';
import { provideValueAccessor } from '@dsh/utils';

@Component({
    selector: 'dsh-shops-field',
    templateUrl: 'shops-field.component.html',
    providers: [provideValueAccessor(() => ShopsFieldComponent)],
})
export class ShopsFieldComponent extends WrappedFormControlSuperclass<Shop['id'][]> implements OnChanges {
    @Input() shops: Shop[];

    options$ = defer(() => this.shops$).pipe(
        map((shops) => shops.map((shop) => ({ value: shop.id, label: shop.details.name }))),
        shareReplayRefCount()
    );

    private shops$ = new ReplaySubject<Shop[]>();

    constructor() {
        super();
    }

    ngOnChanges({ shops }: ComponentChanges<ShopsFieldComponent>): void {
        if (shops) this.shops$.next(shops.currentValue);
    }
}
