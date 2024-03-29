import { Component, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy } from '@ngneat/until-destroy';
import {
    createControlProviders,
    FormGroupSuperclass,
    NotifyLogService,
    ComponentChanges,
} from '@vality/ng-core';
import { BankCard, PaymentMethod, PaymentTerminal, DigitalWallet } from '@vality/swag-payments';
import { Observable } from 'rxjs';

import { TokenProvider, TerminalProvider } from '@dsh/app/api/payments';
import { PaymentLinkParams } from '@dsh/app/shared/services/create-payment-link/types/payment-link-params';

import { HoldExpiration } from '../../services/create-payment-link/types/hold-expiration';
import { ORDERED_PAYMENT_METHODS_NAMES } from '../../services/create-payment-link/types/ordered-payment-methods-names';

import { Controls, EMPTY_VALUE } from './types/controls';

import MethodEnum = PaymentMethod.MethodEnum;

@UntilDestroy()
@Component({
    selector: 'dsh-create-payment-link-form',
    templateUrl: 'create-payment-link-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => CreatePaymentLinkFormComponent),
})
export class CreatePaymentLinkFormComponent
    extends FormGroupSuperclass<Partial<PaymentLinkParams>, Controls>
    implements OnChanges
{
    @Input() paymentMethods: PaymentMethod[];
    @Input() paymentLink: string;

    holdExpirations = Object.values(HoldExpiration);
    orderedPaymentMethodsNames = ORDERED_PAYMENT_METHODS_NAMES;
    paymentMethodLabels = this.getPaymentMethodLabels();
    holdExpirationLabels = this.getHoldExpirationLabels();
    control = this.fb.group({
        ...EMPTY_VALUE,
        email: [EMPTY_VALUE['email'], Validators.email],
        paymentMethods: this.fb.group(
            Object.fromEntries(
                Object.entries(EMPTY_VALUE.paymentMethods).map(([name, value]) => [
                    name,
                    { value, disabled: true },
                ]),
            ) as unknown,
        ),
    }) as FormGroup;

    constructor(
        private log: NotifyLogService,
        private transloco: TranslocoService,
        private fb: FormBuilder,
    ) {
        super();
    }

    ngOnChanges(changes: ComponentChanges<CreatePaymentLinkFormComponent>): void {
        super.ngOnChanges(changes);
        if (changes.paymentMethods) {
            this.updatePaymentMethods(changes.paymentMethods.currentValue || []);
        }
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

    protected innerToOuterValue({
        holdExpiration,
        paymentMethods,
        ...value
    }: Controls): PaymentLinkParams {
        return {
            ...(value.paymentFlowHold ? { holdExpiration } : {}),
            ...value,
            ...paymentMethods,
        };
    }

    private updatePaymentMethods(paymentMethods: PaymentMethod[]) {
        const paymentMethodsControls: FormGroup['controls'] =
            this.control.controls.paymentMethods['controls'];
        Object.values(paymentMethodsControls).forEach((c) => c.disable());
        paymentMethods.forEach((item) => {
            switch (item.method) {
                case MethodEnum.BankCard: {
                    const bankCard = item as BankCard;
                    if (Array.isArray(bankCard.tokenProviders) && bankCard.tokenProviders.length) {
                        for (const provider of bankCard.tokenProviders) {
                            switch (provider) {
                                case TokenProvider.ApplePay:
                                    paymentMethodsControls.applePay.enable();
                                    break;
                                case TokenProvider.GooglePay:
                                    paymentMethodsControls.googlePay.enable();
                                    break;
                                case TokenProvider.SamsungPay:
                                    paymentMethodsControls.samsungPay.enable();
                                    break;
                                case TokenProvider.YandexPay:
                                    paymentMethodsControls.yandexPay.enable();
                                    break;
                                default:
                                    console.error(`Unhandled TokenProvider - ${provider}`);
                                    break;
                            }
                        }
                    } else {
                        paymentMethodsControls.bankCard.enable();
                    }
                    break;
                }
                case MethodEnum.DigitalWallet:
                    if ((item as DigitalWallet).providers.length) {
                        paymentMethodsControls.wallets.enable();
                    }
                    break;
                case MethodEnum.PaymentTerminal:
                    (item as PaymentTerminal).providers.forEach((p) => {
                        switch (p) {
                            case TerminalProvider.Euroset:
                                paymentMethodsControls.euroset.enable();
                                break;
                            case TerminalProvider.Qps:
                                paymentMethodsControls.qps.enable();
                                break;
                            case TerminalProvider.Uzcard:
                                paymentMethodsControls.uzcard.enable();
                                break;
                            default:
                                console.error(`Unhandled PaymentTerminal provider - ${p}`);
                                break;
                        }
                    });
                    break;
                case MethodEnum.MobileCommerce:
                    paymentMethodsControls.mobileCommerce.enable();
                    break;
                default:
                    console.error(`Unhandled PaymentMethod - ${item.method}`);
                    break;
            }
        });
    }

    private getPaymentMethodLabels(): Record<
        (typeof ORDERED_PAYMENT_METHODS_NAMES)[number],
        Observable<string>
    > {
        return {
            bankCard: this.transloco.selectTranslate(
                'createPaymentLinkForm.paymentMethod.bankCard',
                null,
                'components',
            ),
            yandexPay: this.transloco.selectTranslate(
                'createPaymentLinkForm.paymentMethod.yandexPay',
                null,
                'components',
            ),
            applePay: this.transloco.selectTranslate(
                'createPaymentLinkForm.paymentMethod.applePay',
                null,
                'components',
            ),
            googlePay: this.transloco.selectTranslate(
                'createPaymentLinkForm.paymentMethod.googlePay',
                null,
                'components',
            ),
            samsungPay: this.transloco.selectTranslate(
                'createPaymentLinkForm.paymentMethod.samsungPay',
                null,
                'components',
            ),
            uzcard: this.transloco.selectTranslate(
                'createPaymentLinkForm.paymentMethod.uzcard',
                null,
                'components',
            ),
            wallets: this.transloco.selectTranslate(
                'createPaymentLinkForm.paymentMethod.wallets',
                null,
                'components',
            ),
            euroset: this.transloco.selectTranslate(
                'createPaymentLinkForm.paymentMethod.euroset',
                null,
                'components',
            ),
            qps: this.transloco.selectTranslate(
                'createPaymentLinkForm.paymentMethod.qps',
                null,
                'components',
            ),
            mobileCommerce: this.transloco.selectTranslate(
                'createPaymentLinkForm.paymentMethod.mobileCommerce',
                null,
                'components',
            ),
        };
    }

    private getHoldExpirationLabels(): Record<HoldExpiration, Observable<string>> {
        return {
            [HoldExpiration.Cancel]: this.transloco.selectTranslate(
                'createPaymentLinkForm.holdExpiration.cancel',
                null,
                'components',
            ),
            [HoldExpiration.Capture]: this.transloco.selectTranslate(
                'createPaymentLinkForm.holdExpiration.capture',
                null,
                'components',
            ),
        };
    }
}
