import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControlSuperclass, Option, provideValueAccessor } from '@vality/ng-core';
import { PaymentInstitution } from '@vality/swag-payments';
import { coerceBoolean } from 'coerce-property';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';

import { PaymentInstitutionsService } from '@dsh/app/api/payments';

@Component({
    selector: 'dsh-payment-institution-field',
    templateUrl: 'payment-institution-field.component.html',
    providers: [provideValueAccessor(() => PaymentInstitutionFieldComponent)],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentInstitutionFieldComponent extends FormControlSuperclass<PaymentInstitution> {
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
