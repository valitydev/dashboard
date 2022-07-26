import { Component, Injector } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

import {
    createTypeUnionDefaultForm,
    TypeUnion,
} from '@dsh/app/shared/components/shop-creation/created-existing-switch/created-existing-switch.component';
import { ValidatedControlSuperclass, createControlProviders } from '@dsh/utils';

import { ExistingContractForm } from '../../../existing-contract-form/existing-contract-form.component';
import { NewContractorForm } from './../new-contractor-form/new-contractor-form.component';

export type OrgDetailsForm = TypeUnion<NewContractorForm, ExistingContractForm<'RussianLegalEntity'>>;

@UntilDestroy()
@Component({
    selector: 'dsh-org-details-form',
    templateUrl: 'org-details-form.component.html',
    providers: createControlProviders(OrgDetailsFormComponent),
})
export class OrgDetailsFormComponent extends ValidatedControlSuperclass<OrgDetailsForm> {
    control = createTypeUnionDefaultForm<NewContractorForm, ExistingContractForm<'RussianLegalEntity'>>();

    constructor(injector: Injector) {
        super(injector);
    }
}
