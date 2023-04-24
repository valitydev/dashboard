import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { PaymentInstitution } from '@vality/swag-payments';
import { coerceBoolean } from 'coerce-property';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';

import { PaymentInstitutionsService } from '@dsh/api/payments';
import { Option } from '@dsh/components/form-controls/select-search-field';
import { provideValueAccessor } from '@dsh/utils';

@Component({
    selector: 'dsh-payment-institution-field',
    templateUrl: 'payment-institution-field.component.html',
    providers: [provideValueAccessor(() => PaymentInstitutionFieldComponent)],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentInstitutionFieldComponent extends WrappedFormControlSuperclass<PaymentInstitution> {
    @Input() label: string;
    @Input() @coerceBoolean required = false;

    options$: Observable<Option<PaymentInstitution>[]> = this.paymentInstitutionsService.paymentInstitutions$.pipe(
        map((paymentInstitutions) =>
            paymentInstitutions.map((paymentInstitution) => ({
                label: `${paymentInstitution.id} - ${paymentInstitution.name}`,
                value: paymentInstitution,
            }))
        ),
        share()
    );

    constructor(private paymentInstitutionsService: PaymentInstitutionsService) {
        super();
    }
}
