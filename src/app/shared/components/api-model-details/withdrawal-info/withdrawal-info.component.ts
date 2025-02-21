import { Component, Input } from '@angular/core';
import { Withdrawal } from '@vality/swag-wallet';

@Component({
    selector: 'dsh-withdrawal-info',
    templateUrl: 'withdrawal-info.component.html',
    standalone: false,
})
export class WithdrawalInfoComponent {
    @Input() withdrawal: Withdrawal;
}
