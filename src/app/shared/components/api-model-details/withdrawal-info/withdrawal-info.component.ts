import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Withdrawal } from '@vality/swag-wallets';

@Component({
    selector: 'dsh-withdrawal-info',
    templateUrl: 'withdrawal-info.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
export class WithdrawalInfoComponent {
    @Input() withdrawal: Withdrawal;
}
