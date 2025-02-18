import { Component, Input } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { createControlProviders, FormControlSuperclass } from '@vality/matez';
import {
    Shop,
    Contract,
    InternationalLegalEntity,
    RussianLegalEntity,
    LegalEntityAllOf,
} from '@vality/swag-payments';
import { BehaviorSubject, EMPTY, of, Observable, throwError } from 'rxjs';
import { switchMap, catchError, share, tap } from 'rxjs/operators';
import { Overwrite } from 'utility-types';

import { ContractsService } from '@dsh/app/api/payments';
import { CommonError } from '@dsh/app/shared';
import { progressTo, errorTo } from '@dsh/utils';

import EntityTypeEnum = LegalEntityAllOf.EntityTypeEnum;

export type ExistingContractForm<T extends EntityTypeEnum = EntityTypeEnum> = Overwrite<
    Contract,
    {
        contractor: T extends 'InternationalLegalEntity'
            ? InternationalLegalEntity
            : RussianLegalEntity;
    }
>;

@Component({
    selector: 'dsh-existing-contract-form',
    templateUrl: 'existing-contract-form.component.html',
    providers: createControlProviders(() => ExistingContractFormComponent),
    standalone: false,
})
export class ExistingContractFormComponent extends FormControlSuperclass<
    ExistingContractForm,
    Shop
> {
    @Input() entityType: EntityTypeEnum;

    progress$ = new BehaviorSubject(0);
    error$ = new BehaviorSubject<unknown>(null);
    contract: Contract = null;

    constructor(
        private contractsService: ContractsService,
        private transloco: TranslocoService,
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
                    catchError((err) => (console.error(err), EMPTY)),
                ),
            ),
            tap((contract) => (this.contract = contract)),
            share(),
        );
    }

    private getContract(contractID: Contract['id']): Observable<ExistingContractForm> {
        return this.contractsService.getContractByIDForParty({ contractID }).pipe(
            switchMap((contract: ExistingContractForm) => {
                if (contract.contractor.entityType !== this.entityType) {
                    return (
                        this.entityType === EntityTypeEnum.InternationalLegalEntity
                            ? this.transloco.selectTranslate<string>(
                                  'existingContractForm.errors.onlyInternationalShopCanBeSelected',
                                  null,
                                  'components',
                              )
                            : this.transloco.selectTranslate<string>(
                                  'existingContractForm.errors.onlyRussianShopCanBeSelected',
                                  null,
                                  'components',
                              )
                    ).pipe(switchMap((t) => throwError(new CommonError(t))));
                }
                return of(contract);
            }),
        );
    }
}
