import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControlSuperclass, createControlProviders } from '@vality/ng-core';
import { Claim } from '@vality/swag-claim-management';

@Component({
    selector: 'dsh-claim-field',
    templateUrl: 'claim-field.component.html',
    styleUrls: ['claim-field.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => ClaimFieldComponent),
    standalone: false,
})
export class ClaimFieldComponent extends FormControlSuperclass<Claim['id']> {}
