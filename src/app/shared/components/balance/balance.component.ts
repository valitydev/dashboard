import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { isNumber } from 'lodash-es';
import isEmpty from 'lodash-es/isEmpty';

@Component({
    selector: 'dsh-balance',
    templateUrl: 'balance.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class BalanceComponent {
    @Input() amount: number;
    @Input() currency: string;

    get isBalanceProvided(): boolean {
        return isNumber(this.amount) && !isEmpty(this.currency);
    }
}
