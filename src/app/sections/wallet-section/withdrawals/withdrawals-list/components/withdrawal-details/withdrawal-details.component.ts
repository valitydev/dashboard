import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Withdrawal } from '@vality/swag-wallet';

@Component({
    selector: 'dsh-withdrawal-details',
    templateUrl: 'withdrawal-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithdrawalDetailsComponent {
    @Input() withdrawal: Withdrawal;
}
