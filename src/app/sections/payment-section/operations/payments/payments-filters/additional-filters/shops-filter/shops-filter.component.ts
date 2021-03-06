import { Component, Injector, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';

import { ShopsService } from '@dsh/api/payments';
import { ValidatedControlSuperclass, createControlProviders } from '@dsh/utils';

import { ShopsFilterForm } from './types';

@Component({
    selector: 'dsh-shops-filter',
    templateUrl: './shops-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(ShopsFilterComponent),
})
export class ShopsFilterComponent extends ValidatedControlSuperclass<ShopsFilterForm> {
    control = this.fb.group<ShopsFilterForm>({
        shopIDs: null,
    });

    shops$ = this.shopsService.shops$;

    constructor(injector: Injector, private fb: FormBuilder, private shopsService: ShopsService) {
        super(injector);
    }
}
