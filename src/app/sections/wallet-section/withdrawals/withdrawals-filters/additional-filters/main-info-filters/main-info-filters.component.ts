import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroupSuperclass, createControlProviders } from '@vality/matez';

import { MainInfoForm } from './types';

@Component({
    selector: 'dsh-main-info-filters',
    templateUrl: './main-info-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => MainInfoFiltersComponent),
    standalone: false,
})
export class MainInfoFiltersComponent extends FormGroupSuperclass<MainInfoForm> {
    control = this.fb.group<MainInfoForm>({
        withdrawalID: null,
        walletID: null,
        identityID: null,
        destinationID: null,
        externalID: null,
    });

    constructor(private fb: FormBuilder) {
        super();
    }
}
