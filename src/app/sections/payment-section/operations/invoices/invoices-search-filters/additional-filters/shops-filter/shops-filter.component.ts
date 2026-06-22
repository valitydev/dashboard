import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ShopsDataService } from '@dsh/app/shared';

import { FormControlSuperclass, createControlProviders } from '@vality/matez';


@Component({
    selector: 'dsh-shops-filter',
    templateUrl: './shops-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => ShopsFilterComponent),
    standalone: false,
})
export class ShopsFilterComponent extends FormControlSuperclass<string[]> {
    shops$ = this.shopsDataService.shops$;

    constructor(
        private fb: FormBuilder,
        private shopsDataService: ShopsDataService,
    ) {
        super();
    }
}
