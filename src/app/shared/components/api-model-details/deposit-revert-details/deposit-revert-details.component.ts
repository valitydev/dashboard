import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DepositRevert } from '@vality/swag-wallet';

@Component({
    selector: 'dsh-deposit-revert-details',
    templateUrl: 'deposit-revert-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepositRevertDetailsComponent {
    @Input() revert: DepositRevert;
}
