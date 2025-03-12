import { Component, Input } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { FormControlSuperclass, createControlProviders } from '@vality/matez';
import {
    Contract,
    InternationalLegalEntity,
    LegalEntity,
    RussianLegalEntity,
    Shop,
} from '@vality/swag-payments';
import { BehaviorSubject, EMPTY, Observable, of, throwError } from 'rxjs';
import { catchError, share, switchMap, tap } from 'rxjs/operators';
import { Overwrite } from 'utility-types';

import { ContractsService } from '@dsh/app/api/payments';
import { CommonError } from '@dsh/app/shared';
import { errorTo, progressTo } from '@dsh/utils';

import EntityTypeEnum = LegalEntity.EntityTypeEnum;

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
