import { ChangeDetectionStrategy, Component, Input, booleanAttribute } from '@angular/core';
import { FormControlSuperclass, Option, createControlProviders } from '@vality/matez';
import { PaymentInstitution } from '@vality/swag-payments';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';

import { PaymentInstitutionsService } from '@dsh/app/api/payments';

@Component({
    selector: 'dsh-payment-institution-field',
    templateUrl: 'payment-institution-field.component.html',
    providers: createControlProviders(() => PaymentInstitutionFieldComponent),
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class PaymentInstitutionFieldComponent extends FormControlSuperclass<PaymentInstitution> {
    @Input() label: string;
    @Input({ transform: booleanAttribute }) required = false;

    options$: Observable<Option<PaymentInstitution>[]> =
        this.paymentInstitutionsService.paymentInstitutions$.pipe(
            map((paymentInstitutions) =>
                paymentInstitutions.map((paymentInstitution) => ({
                    label: `${paymentInstitution.id} - ${paymentInstitution.name}`,
                    value: paymentInstitution,
                })),
            ),
            share(),
        );

    constructor(private paymentInstitutionsService: PaymentInstitutionsService) {
        super();
    }
}
