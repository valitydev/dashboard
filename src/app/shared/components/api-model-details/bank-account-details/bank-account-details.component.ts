import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BankAccount, PayoutToolDetailsBankAccount } from '@vality/swag-payments';

@Component({
    selector: 'dsh-bank-account-details',
    templateUrl: 'bank-account-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BankAccountDetailsComponent {
    @Input() bankAccount: BankAccount | PayoutToolDetailsBankAccount;
}
