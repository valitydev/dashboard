import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dsh-withdrawal-row-header',
    templateUrl: 'withdrawal-row-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class WithdrawalRowHeaderComponent {}
