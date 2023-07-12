import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControlSuperclass, provideValueAccessor } from '@vality/ng-core';

import { ShopsDataService } from '@dsh/app/shared';

@Component({
    selector: 'dsh-shops-filter',
    templateUrl: './shops-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideValueAccessor(() => ShopsFilterComponent)],
})
export class ShopsFilterComponent extends FormControlSuperclass<string[]> {
    shops$ = this.shopsDataService.shops$;

    constructor(private fb: FormBuilder, private shopsDataService: ShopsDataService) {
        super();
    }
}
