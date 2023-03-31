import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';
import { WrappedFormControlSuperclass } from '@s-libs/ng-core';

import { ShopsDataService } from '@dsh/app/shared';
import { provideValueAccessor } from '@dsh/utils';

@Component({
    selector: 'dsh-shops-filter',
    templateUrl: './shops-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideValueAccessor(() => ShopsFilterComponent)],
})
export class ShopsFilterComponent extends WrappedFormControlSuperclass<string[]> {
    shops$ = this.shopsDataService.shops$;

    constructor(private fb: FormBuilder, private shopsDataService: ShopsDataService) {
        super();
    }
}
