import { Component, ChangeDetectionStrategy } from '@angular/core';
import { WrappedFormControlSuperclass } from '@s-libs/ng-core';

import { provideValueAccessor } from '@dsh/utils';

@Component({
    selector: 'dsh-invoices-filter',
    templateUrl: './invoices-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideValueAccessor(() => InvoicesFilterComponent)],
})
export class InvoicesFilterComponent extends WrappedFormControlSuperclass<string[]> {}
