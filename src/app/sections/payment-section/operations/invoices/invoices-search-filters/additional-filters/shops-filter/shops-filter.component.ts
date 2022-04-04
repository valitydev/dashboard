import { Component, Injector, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';
import { WrappedFormControlSuperclass, provideValueAccessor } from '@s-libs/ng-core';

import { ShopsService } from '@dsh/api/payments';

@Component({
    selector: 'dsh-shops-filter',
    templateUrl: './shops-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideValueAccessor(ShopsFilterComponent)],
})
export class ShopsFilterComponent extends WrappedFormControlSuperclass<string[]> {
    shops$ = this.shopsService.shops$;

    constructor(injector: Injector, private fb: FormBuilder, private shopsService: ShopsService) {
        super(injector);
    }
}
