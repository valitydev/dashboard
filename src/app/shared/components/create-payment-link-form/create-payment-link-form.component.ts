import { Component, Injector, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder } from '@ngneat/reactive-forms';
import { FbGroupConfig } from '@ngneat/reactive-forms/lib/formBuilder';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy } from '@ngneat/until-destroy';
import { BankCard, PaymentMethod, PaymentTerminal, DigitalWallet } from '@vality/swag-payments';

import { TokenProvider, TerminalProvider } from '@dsh/api/payments';
import { PaymentLinkParams } from '@dsh/app/shared/services/create-payment-link/types/payment-link-params';
import { ComponentChanges } from '@dsh/type-utils';
import { createControlProviders, ValidatedControlSuperclass } from '@dsh/utils';

import { HoldExpiration } from '../../services/create-payment-link/types/hold-expiration';
import { ORDERED_PAYMENT_METHODS_NAMES } from '../../services/create-payment-link/types/ordered-payment-methods-names';
import { Controls, EMPTY_VALUE, PaymentMethodControls } from './types/controls';

import MethodEnum = PaymentMethod.MethodEnum;

@UntilDestroy()
@Component({
    selector: 'dsh-create-payment-link-form',
    templateUrl: 'create-payment-link-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(CreatePaymentLinkFormComponent),
})
export class CreatePaymentLinkFormComponent
    extends ValidatedControlSuperclass<PaymentLinkParams, Controls>
    implements OnChanges
{
    @Input() paymentMethods: PaymentMethod[];
    @Input() paymentLink: string;

    holdExpirations = Object.entries(HoldExpiration);
    orderedPaymentMethodsNames = ORDERED_PAYMENT_METHODS_NAMES;
    control = this.fb.group<Controls>({
        ...EMPTY_VALUE,
        email: [EMPTY_VALUE['email'], Validators.email],
        paymentMethods: this.fb.group<PaymentMethodControls>(
            Object.fromEntries(
                Object.entries(EMPTY_VALUE.paymentMethods).map(([name, value]) => [name, { value, disabled: true }])
            ) as FbGroupConfig<PaymentMethodControls>
        ),
    });

    constructor(
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
        private fb: FormBuilder,
        injector: Injector
    ) {
        super(injector);
    }

    ngOnChanges({ paymentMethods }: ComponentChanges<CreatePaymentLinkFormComponent>): void {
        if (paymentMethods) {
            this.updatePaymentMethods(paymentMethods.currentValue || []);
        }
    }

    copied(isCopied: boolean): void {
        this.snackBar.open(this.transloco.translate(isCopied ? 'copied' : 'copyFailed'), 'OK', { duration: 1000 });
    }

    protected innerToOuter({ holdExpiration, paymentMethods, ...value }: Controls): PaymentLinkParams {
        return {
            ...(value.paymentFlowHold ? { holdExpiration } : {}),
            ...value,
            ...paymentMethods,
        };
    }

    private updatePaymentMethods(paymentMethods: PaymentMethod[]) {
        const paymentMethodsControls = this.control.controls.paymentMethods.controls;
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
}
