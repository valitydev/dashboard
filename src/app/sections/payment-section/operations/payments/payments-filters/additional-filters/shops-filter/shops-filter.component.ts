import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';

import { ShopsDataService } from '@dsh/app/shared';
import { ValidatedControlSuperclass, createControlProviders } from '@dsh/utils';

import { ShopsFilterForm } from './types';

@Component({
    selector: 'dsh-shops-filter',
    templateUrl: './shops-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => ShopsFilterComponent),
})
export class ShopsFilterComponent extends ValidatedControlSuperclass<ShopsFilterForm> {
    control = this.fb.group<ShopsFilterForm>({
        shopIDs: null,
    });

    shops$ = this.shopsDataService.shops$;

    constructor(private fb: FormBuilder, private shopsDataService: ShopsDataService) {
        super();
    }
}
