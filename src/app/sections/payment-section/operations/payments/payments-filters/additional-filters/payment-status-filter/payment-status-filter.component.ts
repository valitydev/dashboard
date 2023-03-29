import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WrappedFormControlSuperclass, provideValueAccessor } from '@s-libs/ng-core';
import { PaymentStatus } from '@vality/swag-anapi-v2';

import { PaymentsDictionaryService } from '@dsh/api/payments';

@Component({
    selector: 'dsh-payment-status-filter',
    templateUrl: './payment-status-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideValueAccessor(PaymentStatusFilterComponent)],
})
export class PaymentStatusFilterComponent extends WrappedFormControlSuperclass<PaymentStatus.StatusEnum> {
    statuses = Object.values(PaymentStatus.StatusEnum);
    paymentStatusDict$ = this.paymentsDictionaryService.paymentStatus$;

    constructor(private paymentsDictionaryService: PaymentsDictionaryService) {
        super();
    }
}
