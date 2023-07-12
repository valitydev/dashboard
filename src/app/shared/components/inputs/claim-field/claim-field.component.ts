import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControlSuperclass, provideValueAccessor } from '@vality/ng-core';
import { Claim } from '@vality/swag-claim-management';

@Component({
    selector: 'dsh-claim-field',
    templateUrl: 'claim-field.component.html',
    styleUrls: ['claim-field.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideValueAccessor(() => ClaimFieldComponent)],
})
export class ClaimFieldComponent extends FormControlSuperclass<Claim['id']> {}
