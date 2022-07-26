import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';

import { createControlProviders, ValidatedControlSuperclass } from '@dsh/utils';

import { MainInfoForm } from './types';

@Component({
    selector: 'dsh-main-info-filters',
    templateUrl: './main-info-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(MainInfoFiltersComponent),
})
export class MainInfoFiltersComponent extends ValidatedControlSuperclass<MainInfoForm> {
    control = this.fb.group<MainInfoForm>({
        withdrawalID: null,
        walletID: null,
        identityID: null,
        destinationID: null,
    });

    constructor(injector: Injector, private fb: FormBuilder) {
        super(injector);
    }
}
