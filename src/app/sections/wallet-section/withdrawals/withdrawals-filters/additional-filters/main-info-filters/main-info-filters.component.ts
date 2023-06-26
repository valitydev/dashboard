import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { createControlProviders, ValidatedControlSuperclass } from '@dsh/utils';

import { MainInfoForm } from './types';

@Component({
    selector: 'dsh-main-info-filters',
    templateUrl: './main-info-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => MainInfoFiltersComponent),
})
export class MainInfoFiltersComponent extends ValidatedControlSuperclass<MainInfoForm> {
    control = this.fb.group<MainInfoForm>({
        withdrawalID: null,
        walletID: null,
        identityID: null,
        destinationID: null,
    });

    constructor(private fb: FormBuilder) {
        super();
    }
}
