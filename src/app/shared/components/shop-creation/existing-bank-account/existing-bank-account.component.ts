import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy } from '@ngneat/until-destroy';
import { FormControlSuperclass, createControlProviders } from '@vality/ng-core';
import {
    PayoutTool,
    PayoutToolDetailsBankAccount,
    PayoutToolDetailsInternationalBankAccount,
    Shop,
} from '@vality/swag-payments';
import { Observable, BehaviorSubject, of, throwError, EMPTY } from 'rxjs';
import { switchMap, tap, share, catchError } from 'rxjs/operators';
import { Overwrite } from 'utility-types';

import { PayoutsService } from '@dsh/app/api/payments';
import { CommonError } from '@dsh/app/shared';
import { progressTo, errorTo } from '@dsh/utils';

type BankAccountType = 'PayoutToolDetailsInternationalBankAccount' | 'PayoutToolDetailsBankAccount';

export type ExistingBankAccountForm<T extends BankAccountType = BankAccountType> = Overwrite<
    PayoutTool,
    {
        details: T extends 'PayoutToolDetailsInternationalBankAccount'
            ? PayoutToolDetailsInternationalBankAccount
            : PayoutToolDetailsBankAccount;
    }
>;

@UntilDestroy()
@Component({
    selector: 'dsh-existing-bank-account',
    templateUrl: 'existing-bank-account.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => ExistingBankAccountComponent),
})
export class ExistingBankAccountComponent extends FormControlSuperclass<
    ExistingBankAccountForm,
    Shop
> {
    @Input() bankAccountType: BankAccountType;

    payoutTool: PayoutTool = null;
    progress$ = new BehaviorSubject<number>(0);
    error$ = new BehaviorSubject<unknown>(null);

    constructor(
        private payoutsService: PayoutsService,
        private transloco: TranslocoService,
    ) {
        super();
    }

    protected setUpInnerToOuterValue$(value$: Observable<Shop>): Observable<PayoutTool> {
        return value$.pipe(
            switchMap((shop) =>
                (shop?.contractID && shop?.payoutToolID
                    ? this.getPayoutToolByShop(shop)
                    : of<PayoutTool>(null)
                ).pipe(
                    progressTo(this.progress$),
                    errorTo(this.error$, true),
                    catchError((err) => (console.error(err), EMPTY)),
                ),
            ),
            tap((payoutTool) => (this.payoutTool = payoutTool)),
            share(),
        );
    }

    protected outerToInnerValue(): Shop {
        return null;
    }

    private getPayoutToolByShop(shop: Shop): Observable<PayoutTool> {
        return this.payoutsService
            .getPayoutToolByIDForParty({
                contractID: shop.contractID,
                payoutToolID: shop.payoutToolID,
            })
            .pipe(
                switchMap((payoutTool) => {
                    if (payoutTool.details.detailsType !== this.bankAccountType)
                        return (
                            this.bankAccountType === 'PayoutToolDetailsInternationalBankAccount'
                                ? this.transloco.selectTranslate(
                                      'existingBankAccount.errors.onlyInternationalShopCanBeSelected',
                                      null,
                                      'components',
                                  )
                                : this.transloco.selectTranslate(
                                      'existingBankAccount.errors.onlyRussianShopCanBeSelected',
                                      null,
                                      'components',
                                  )
                        ).pipe(switchMap((t) => throwError(new CommonError(t))));
                    return of(payoutTool);
                }),
            );
    }
}
