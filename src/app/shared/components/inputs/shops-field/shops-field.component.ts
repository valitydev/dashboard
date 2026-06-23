import { ReplaySubject, defer } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';

import { ComponentChanges, FormControlSuperclass, createControlProviders } from '@vality/matez';
import { Shop } from '@vality/swag-payments';

@Component({
    selector: 'dsh-shops-field',
    templateUrl: 'shops-field.component.html',
    providers: createControlProviders(() => ShopsFieldComponent),
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
export class ShopsFieldComponent extends FormControlSuperclass<Shop['id'][]> implements OnChanges {
    @Input() shops: Shop[];

    options$ = defer(() => this.shops$).pipe(
        map((shops) => shops.map((shop) => ({ value: shop.id, label: shop.details.name }))),
        shareReplay({ refCount: true, bufferSize: 1 }),
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
