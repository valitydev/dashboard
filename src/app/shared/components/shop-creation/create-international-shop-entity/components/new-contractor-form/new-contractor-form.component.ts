import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { FormBuilder, FormControl } from '@ngneat/reactive-forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { createControlProviders, ValidatedControlSuperclass } from '@dsh/utils';

export interface NewContractorForm {
    organizationName: string;
    tradingName: string;
    registeredAddress: string;
    actualAddress: string;
    country: string;
}

@UntilDestroy()
@Component({
    selector: 'dsh-new-contractor-form',
    templateUrl: 'new-contractor-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(NewContractorFormComponent),
})
export class NewContractorFormComponent extends ValidatedControlSuperclass<NewContractorForm> {
    control = this.fb.group<NewContractorForm>({
        organizationName: '',
        tradingName: '',
        registeredAddress: '',
        actualAddress: '',
        country: '',
    });
    searchControl = new FormControl<string>('');

    constructor(injector: Injector, private fb: FormBuilder) {
        super(injector);
    }
}
