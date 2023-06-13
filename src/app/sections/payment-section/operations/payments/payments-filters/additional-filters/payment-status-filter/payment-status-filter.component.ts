import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { PaymentStatus } from '@vality/swag-anapi-v2';

import { AnapiDictionaryService } from '@dsh/app/api/anapi';
import { provideValueAccessor } from '@dsh/utils';

@Component({
    selector: 'dsh-payment-status-filter',
    templateUrl: './payment-status-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideValueAccessor(() => PaymentStatusFilterComponent)],
})
export class PaymentStatusFilterComponent extends WrappedFormControlSuperclass<PaymentStatus.StatusEnum> {
    statuses = Object.values(PaymentStatus.StatusEnum);
    paymentStatusDict$ = this.anapiDictionaryService.paymentStatus$;

    constructor(private anapiDictionaryService: AnapiDictionaryService) {
        super();
    }
}
