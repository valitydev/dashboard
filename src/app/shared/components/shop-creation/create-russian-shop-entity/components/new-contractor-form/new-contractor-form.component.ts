import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { FormGroupSuperclass, createControlProviders } from '@vality/ng-core';

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

    constructor(private fb: FormBuilder) {
        super();
    }
}
