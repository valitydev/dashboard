import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Deposit } from '@vality/swag-wallet';

@Component({
    selector: 'dsh-deposit-details',
    templateUrl: 'deposit-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepositDetailsComponent {
    @Input() deposit: Deposit;
}
