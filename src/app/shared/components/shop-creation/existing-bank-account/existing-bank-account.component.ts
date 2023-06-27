import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy } from '@ngneat/until-destroy';
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
import { CommonError, ErrorService } from '@dsh/app/shared';
import { ValidatedControlSuperclass, createControlProviders, progressTo, errorTo } from '@dsh/utils';

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
export class ExistingBankAccountComponent extends ValidatedControlSuperclass<ExistingBankAccountForm, Shop> {
    @Input() bankAccountType: BankAccountType;

    control = new FormControl<Shop>(null);
    payoutTool: PayoutTool = null;
    progress$ = new BehaviorSubject<number>(0);
    error$ = new BehaviorSubject<unknown>(null);

    constructor(
        private payoutsService: PayoutsService,
        private transloco: TranslocoService,
        private errorService: ErrorService
    ) {
        super();
    }

    protected setUpInnerToOuterValue$(value$: Observable<Shop>): Observable<PayoutTool> {
        return value$.pipe(
            switchMap((shop) =>
                (shop?.contractID && shop?.payoutToolID ? this.getPayoutToolByShop(shop) : of<PayoutTool>(null)).pipe(
                    progressTo(this.progress$),
                    errorTo(this.error$, true),
                    catchError((err) => (this.errorService.error(err, false), EMPTY))
                )
            ),
            tap((payoutTool) => (this.payoutTool = payoutTool)),
            share()
        );
    }

    protected outerToInnerValue(): Shop {
        return null;
    }

    private getPayoutToolByShop(shop: Shop): Observable<PayoutTool> {
        return this.payoutsService
            .getPayoutToolByIDForParty({ contractID: shop.contractID, payoutToolID: shop.payoutToolID })
            .pipe(
                switchMap((payoutTool) => {
                    if (payoutTool.details.detailsType !== this.bankAccountType)
                        return (
                            this.bankAccountType === 'PayoutToolDetailsInternationalBankAccount'
                                ? this.transloco.selectTranslate(
                                      'existingBankAccount.errors.onlyInternationalShopCanBeSelected',
                                      null,
                                      'components'
                                  )
                                : this.transloco.selectTranslate(
                                      'existingBankAccount.errors.onlyRussianShopCanBeSelected',
                                      null,
                                      'components'
                                  )
                        ).pipe(switchMap((t) => throwError(new CommonError(t))));
                    return of(payoutTool);
                })
            );
    }
}
