import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { WrappedFormControlSuperclass, provideValueAccessor } from '@s-libs/ng-core';
import { InvoiceStatus } from '@vality/swag-anapi-v2';

import { AnapiDictionaryService } from '@dsh/api/anapi';

@Component({
    selector: 'dsh-invoice-status-filter',
    templateUrl: './invoice-status-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideValueAccessor(InvoiceStatusFilterComponent)],
})
export class InvoiceStatusFilterComponent extends WrappedFormControlSuperclass<InvoiceStatus.StatusEnum> {
    statuses = Object.values(InvoiceStatus.StatusEnum);
    invoiceStatusDict$ = this.anapiDictionaryService.invoiceStatus$;

    constructor(injector: Injector, private anapiDictionaryService: AnapiDictionaryService) {
        super(injector);
    }
}
