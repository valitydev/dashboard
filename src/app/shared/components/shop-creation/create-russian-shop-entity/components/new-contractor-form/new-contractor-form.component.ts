import { Component } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormGroupSuperclass, createControlProviders } from '@vality/ng-core';
import { PartyContent, ReqResponse, OrgType } from '@vality/swag-questionary-aggr-proxy';
import { map } from 'rxjs/operators';

import {
    KonturFocusService,
    createIndividualEntityRegisteredName,
    isReqLegalEntity,
    isReqIndividualEntity,
    getAddress,
} from '@dsh/app/api/questionary-aggr-proxy';

import { RussianBankAccountForm } from '../russian-bank-account-form/types/bank-account-form-data';

export interface NewContractorForm {
    registeredName: string;
    inn: string;
    registeredNumber: string;
    actualAddress: string;
    representativePosition: string;
    representativeFullName: string;
    representativeDocument: string;
    bankAccount: RussianBankAccountForm;
}

@UntilDestroy()
@Component({
    selector: 'dsh-new-contractor-form',
    templateUrl: 'new-contractor-form.component.html',
    providers: createControlProviders(() => NewContractorFormComponent),
})
export class NewContractorFormComponent extends FormGroupSuperclass<Partial<NewContractorForm>> {
    control = this.fb.group<NewContractorForm>({
        registeredName: null,
        inn: null,
        registeredNumber: null,
        actualAddress: null,
        representativePosition: null,
        representativeFullName: null,
        representativeDocument: null,
        bankAccount: null,
    });
    searchControl = new FormControl<string>('');

    constructor(private fb: FormBuilder, private konturFocusService: KonturFocusService) {
        super();
    }

    updateSuggestion(dadata: PartyContent): void {
        if (!dadata) return this.control.patchValue(this.getFormByData());
        this.konturFocusService
            .request('ReqQuery', {
                inn: [dadata.inn],
            })
            .pipe(
                map(([kontur]): Partial<NewContractorForm> => this.getFormByData(dadata, kontur)),
                untilDestroyed(this)
            )
            .subscribe(
                (data) => this.control.patchValue(data),
                (err) => {
                    console.error('Kontur.Focus API error', err);
                    this.control.patchValue(this.getFormByData(dadata));
                }
            );
    }

    private getFormByData(dadata?: PartyContent, kontur?: ReqResponse): Partial<NewContractorForm> {
        const result: Partial<NewContractorForm> = {
            inn: kontur?.inn || dadata?.inn || null,
            registeredNumber: kontur?.ogrn || dadata?.ogrn || null,
            registeredName: dadata?.name?.shortWithOpf || null,
            actualAddress: null,
            representativeFullName: null,
        };
        if (dadata) {
            if (dadata.orgType === OrgType.Individual) {
                result.actualAddress = dadata.address?.value || result.actualAddress;
                result.representativeFullName = dadata.name?.fullName || result.representativeFullName;
            }
        }
        if (kontur) {
            if (isReqIndividualEntity(kontur.contractor)) {
                result.registeredName =
                    createIndividualEntityRegisteredName(kontur.contractor.fio) || result.registeredName;
                result.representativeFullName = kontur.contractor.fio || result.representativeFullName;
            }
            if (isReqLegalEntity(kontur.contractor)) {
                result.registeredName = kontur.contractor.legalName.shortName || result.registeredName;
                result.actualAddress = getAddress(kontur.contractor.legalAddress.addressRf) || result.actualAddress;
            }
        }
        return result;
    }
}
