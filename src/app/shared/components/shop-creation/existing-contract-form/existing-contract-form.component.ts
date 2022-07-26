import { Component, Injector, Input } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Shop, Contract, InternationalLegalEntity, RussianLegalEntity, LegalEntityAllOf } from '@vality/swag-payments';
import { BehaviorSubject, EMPTY, of, Observable, throwError } from 'rxjs';
import { switchMap, catchError, share, tap } from 'rxjs/operators';
import { Overwrite } from 'utility-types';

import { ContractsService } from '@dsh/api/payments';
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
    providers: createControlProviders(ExistingContractFormComponent),
})
export class ExistingContractFormComponent extends ValidatedControlSuperclass<ExistingContractForm, Shop> {
    @Input() entityType: EntityTypeEnum;

    control = this.fb.control<Shop>(null);
    progress$ = new BehaviorSubject(0);
    error$ = new BehaviorSubject<unknown>(null);
    contract: Contract = null;

    constructor(
        injector: Injector,
        private contractsService: ContractsService,
        private fb: FormBuilder,
        private transloco: TranslocoService,
        private errorService: ErrorService
    ) {
        super(injector);
    }

    protected outerToInner(): Shop {
        return null;
    }

    protected setUpInnerToOuter$(value$: Observable<Shop>): Observable<ExistingContractForm> {
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
        return this.contractsService.getContractByID({ contractID }).pipe(
            switchMap((contract: ExistingContractForm) => {
                if (contract.contractor.entityType !== this.entityType)
                    return this.transloco
                        .selectTranslate(
                            `existingContractForm.errors.${
                                this.entityType === EntityTypeEnum.InternationalLegalEntity
                                    ? 'onlyInternationalShopCanBeSelected'
                                    : 'onlyRussianShopCanBeSelected'
                            }`,
                            null,
                            'create-shop'
                        )
                        .pipe(switchMap((t) => throwError(new CommonError(t))));
                return of(contract);
            })
        );
    }
}
