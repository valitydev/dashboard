import { Component, Input, OnChanges } from '@angular/core';
import { FormControlSuperclass, createControlProviders, ComponentChanges } from '@vality/matez';
import { Shop } from '@vality/swag-payments';
import { defer, ReplaySubject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
    selector: 'dsh-shops-field',
    templateUrl: 'shops-field.component.html',
    providers: createControlProviders(() => ShopsFieldComponent),
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
