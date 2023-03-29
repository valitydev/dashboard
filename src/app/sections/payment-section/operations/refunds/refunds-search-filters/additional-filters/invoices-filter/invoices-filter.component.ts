import { Component, ChangeDetectionStrategy } from '@angular/core';
import { WrappedFormControlSuperclass, provideValueAccessor } from '@s-libs/ng-core';

@Component({
    selector: 'dsh-invoices-filter',
    templateUrl: './invoices-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideValueAccessor(InvoicesFilterComponent)],
})
export class InvoicesFilterComponent extends WrappedFormControlSuperclass<string[]> {}
