import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Deposit } from '@vality/swag-wallet';

@Component({
    selector: 'dsh-deposit-row',
    templateUrl: 'deposit-row.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepositRowComponent {
    @Input() deposit: Deposit;
}
