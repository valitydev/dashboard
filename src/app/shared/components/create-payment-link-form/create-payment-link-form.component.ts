import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { TranslocoService } from '@jsverse/transloco';
import { createControlProviders, FormGroupSuperclass, NotifyLogService } from '@vality/matez';
import { PaymentMethod } from '@vality/swag-payments';

import { PaymentLinkParams } from '@dsh/app/shared/services/create-payment-link/types/payment-link-params';

import { HoldExpiration } from '../../services/create-payment-link/types/hold-expiration';

import { Controls } from './types/controls';

@Component({
    selector: 'dsh-create-payment-link-form',
    templateUrl: 'create-payment-link-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => CreatePaymentLinkFormComponent),
    standalone: false,
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
        cancelUrl: '',
        locale: null,
        paymentFlowHold: false,
        onHoldExpiration: HoldExpiration.Cancel,
    });

    localeCodes = ['ru', 'en', 'ar', 'az', 'pt', 'tj', 'tr', 'uz'];

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

    protected innerToOuterValue(value: Controls): PaymentLinkParams {
        let paymentFlow = null;
        if (value.paymentFlowHold) {
            paymentFlow = {
                type: 'PaymentFlowHold',
                onHoldExpiration: value.onHoldExpiration,
            };
        }
        return {
            name: value.name,
            description: value.description,
            email: value.email,
            redirectUrl: value.redirectUrl,
            cancelUrl: value.cancelUrl,
            locale: value.locale,
            paymentFlow,
        };
    }
}
