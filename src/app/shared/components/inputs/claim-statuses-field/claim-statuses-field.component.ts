import { Component, OnChanges } from '@angular/core';
import { FormControlSuperclass, createControlProviders } from '@vality/matez';

import { valuesToOptions } from '@dsh/components/form-controls/utils/values-to-options';

import { ClaimStatusesLabelPipe } from './pipes/claim-statuses-label.pipe';
import { ClaimStatusesEnum } from './types/claim-statuses-enum';

@Component({
    selector: 'dsh-claim-statuses-field',
    templateUrl: 'claim-statuses-field.component.html',
    providers: [
        ...createControlProviders(() => ClaimStatusesFieldComponent),
        ClaimStatusesLabelPipe,
    ],
})
export class ClaimStatusesFieldComponent
    extends FormControlSuperclass<ClaimStatusesEnum[]>
    implements OnChanges
{
    options$ = valuesToOptions(Object.values(ClaimStatusesEnum), (v) =>
        this.claimStatusesLabelPipe.transform(v),
    );

    constructor(private claimStatusesLabelPipe: ClaimStatusesLabelPipe) {
        super();
    }
}
