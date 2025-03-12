import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Withdrawal } from '@vality/swag-wallets';

@Component({
    selector: 'dsh-withdrawals-list',
    templateUrl: 'withdrawals-list.component.html',
    styleUrls: ['withdrawals-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class WithdrawalsListComponent {
    @Input() withdrawals: Withdrawal[];
    @Input() expandedId: number;
    @Input() lastUpdated: string;
    @Output() expandedIdChange = new EventEmitter<number>();
    @Output() refreshData = new EventEmitter<void>();
}
