import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Wallet } from '@vality/swag-wallets';

@Component({
    selector: 'dsh-wallets-list',
    templateUrl: 'wallets-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class WalletsListComponent {
    @Input() wallets: Wallet[];
    @Input() expandedId: number;
    @Input() lastUpdated: string;
    @Output() expandedIdChange = new EventEmitter<number>();
    @Output() refreshData = new EventEmitter<void>();
}
