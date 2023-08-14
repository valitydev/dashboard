import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { createControlProviders, FormGroupSuperclass } from '@vality/ng-core';

import {
    createTypeUnionDefaultForm,
    TypeUnion,
} from '@dsh/app/shared/components/shop-creation/created-existing-switch/created-existing-switch.component';

import { ExistingContractForm } from '../../../existing-contract-form/existing-contract-form.component';

import { NewContractorForm } from './../new-contractor-form/new-contractor-form.component';

export type OrgDetailsForm = TypeUnion<
    NewContractorForm,
    ExistingContractForm<'RussianLegalEntity'>
>;

@UntilDestroy()
@Component({
    selector: 'dsh-org-details-form',
    templateUrl: 'org-details-form.component.html',
    providers: createControlProviders(() => OrgDetailsFormComponent),
})
export class OrgDetailsFormComponent extends FormGroupSuperclass<Partial<OrgDetailsForm>> {
    control = createTypeUnionDefaultForm<
        NewContractorForm,
        ExistingContractForm<'RussianLegalEntity'>
    >();
}
