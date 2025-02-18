import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormGroupSuperclass, createControlProviders } from '@vality/ng-core';

import { ShopsDataService } from '@dsh/app/shared';

import { ShopsFilterForm } from './types';

@Component({
    selector: 'dsh-shops-filter',
    templateUrl: './shops-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => ShopsFilterComponent),
    standalone: false,
})
export class ShopsFilterComponent extends FormGroupSuperclass<ShopsFilterForm> {
    control = this.fb.group({
        shopIDs: null,
    }) as unknown as FormGroup;

    shops$ = this.shopsDataService.shops$;

    constructor(
        private fb: FormBuilder,
        private shopsDataService: ShopsDataService,
    ) {
        super();
    }
}
