import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControlSuperclass, provideValueAccessor } from '@vality/ng-core';
import { PaymentStatus } from '@vality/swag-anapi-v2';

import { AnapiDictionaryService } from '@dsh/app/api/anapi';

@Component({
    selector: 'dsh-payment-status-filter',
    templateUrl: './payment-status-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideValueAccessor(() => PaymentStatusFilterComponent)],
})
export class PaymentStatusFilterComponent extends FormControlSuperclass<PaymentStatus.StatusEnum> {
    statuses = Object.values(PaymentStatus.StatusEnum);
    paymentStatusDict$ = this.anapiDictionaryService.paymentStatus$;

    constructor(private anapiDictionaryService: AnapiDictionaryService) {
        super();
    }
}
