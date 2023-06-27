import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Shop, Contract, InternationalLegalEntity, RussianLegalEntity, LegalEntityAllOf } from '@vality/swag-payments';
import { BehaviorSubject, EMPTY, of, Observable, throwError } from 'rxjs';
import { switchMap, catchError, share, tap } from 'rxjs/operators';
import { Overwrite } from 'utility-types';

import { ContractsService } from '@dsh/app/api/payments';
import { CommonError, ErrorService } from '@dsh/app/shared';
import { ValidatedControlSuperclass, createControlProviders, progressTo, errorTo } from '@dsh/utils';

import EntityTypeEnum = LegalEntityAllOf.EntityTypeEnum;

export type ExistingContractForm<T extends EntityTypeEnum = EntityTypeEnum> = Overwrite<
    Contract,
    { contractor: T extends 'InternationalLegalEntity' ? InternationalLegalEntity : RussianLegalEntity }
>;

@UntilDestroy()
@Component({
    selector: 'dsh-existing-contract-form',
    templateUrl: 'existing-contract-form.component.html',
    providers: createControlProviders(() => ExistingContractFormComponent),
})
export class ExistingContractFormComponent extends ValidatedControlSuperclass<ExistingContractForm, Shop> {
    @Input() entityType: EntityTypeEnum;

    control = this.fb.control<Shop>(null);
    progress$ = new BehaviorSubject(0);
    error$ = new BehaviorSubject<unknown>(null);
    contract: Contract = null;

    constructor(
        private contractsService: ContractsService,
        private fb: FormBuilder,
        private transloco: TranslocoService,
        private errorService: ErrorService
    ) {
        super();
    }

    protected outerToInnerValue(): Shop {
        return null;
    }

    protected setUpInnerToOuterValue$(value$: Observable<Shop>): Observable<ExistingContractForm> {
        return value$.pipe(
            switchMap((shop) =>
                (shop ? this.getContract(shop.contractID) : of<ExistingContractForm>(null)).pipe(
                    progressTo(this.progress$),
                    errorTo(this.error$, true),
                    catchError((err) => (this.errorService.error(err, false), EMPTY))
                )
            ),
            tap((contract) => (this.contract = contract)),
            share()
        );
    }

    private getContract(contractID: Contract['id']): Observable<ExistingContractForm> {
        return this.contractsService.getContractByIDForParty({ contractID }).pipe(
            switchMap((contract: ExistingContractForm) => {
                if (contract.contractor.entityType !== this.entityType)
                    return (
                        this.entityType === EntityTypeEnum.InternationalLegalEntity
                            ? this.transloco.selectTranslate<string>(
                                  'existingContractForm.errors.onlyInternationalShopCanBeSelected',
                                  null,
                                  'components'
                              )
                            : this.transloco.selectTranslate<string>(
                                  'existingContractForm.errors.onlyRussianShopCanBeSelected',
                                  null,
                                  'components'
                              )
                    ).pipe(switchMap((t) => throwError(new CommonError(t))));
                return of(contract);
            })
        );
    }
}
