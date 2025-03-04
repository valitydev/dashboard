import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroupSuperclass, createControlProviders } from '@vality/matez';

export interface NewContractorForm {
    organizationName: string;
    tradingName: string;
    registeredAddress: string;
    actualAddress: string;
    country: string;
}

@Component({
    selector: 'dsh-new-contractor-form',
    templateUrl: 'new-contractor-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => NewContractorFormComponent),
    standalone: false,
})
export class NewContractorFormComponent extends FormGroupSuperclass<Partial<NewContractorForm>> {
    control = this.fb.group<NewContractorForm>({
        organizationName: '',
        tradingName: '',
        registeredAddress: '',
        actualAddress: '',
        country: '',
    });

    constructor(private fb: FormBuilder) {
        super();
    }
}
