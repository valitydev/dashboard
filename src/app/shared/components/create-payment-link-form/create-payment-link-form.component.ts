import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy } from '@ngneat/until-destroy';
import { createControlProviders, FormGroupSuperclass, NotifyLogService } from '@vality/ng-core';
import { PaymentMethod } from '@vality/swag-payments';

import { PaymentLinkParams } from '@dsh/app/shared/services/create-payment-link/types/payment-link-params';

import { Controls } from './types/controls';

@UntilDestroy()
@Component({
    selector: 'dsh-create-payment-link-form',
    templateUrl: 'create-payment-link-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => CreatePaymentLinkFormComponent),
})
export class CreatePaymentLinkFormComponent extends FormGroupSuperclass<
    Partial<PaymentLinkParams>,
    Controls
> {
    @Input() paymentMethods: PaymentMethod[];
    @Input() paymentLink: string;

    control: FormGroup = this.fb.group({
        name: '',
        description: '',
        email: ['', Validators.email],
        redirectUrl: '',
        locale: null,
    });

    localeCodes = ['ru', 'en', 'ar', 'az', 'bn', 'ja', 'ko', 'pt', 'tr'];

    constructor(
        private log: NotifyLogService,
        private transloco: TranslocoService,
        private fb: FormBuilder,
    ) {
        super();
    }

    copied(isCopied: boolean): void {
        if (isCopied) {
            this.log.success(this.transloco.selectTranslate('shared.copied', null, 'components'));
        } else {
            this.log.success(
                this.transloco.selectTranslate('shared.copyFailed', null, 'components'),
            );
        }
    }
}
