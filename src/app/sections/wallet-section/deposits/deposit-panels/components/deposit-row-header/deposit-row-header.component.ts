import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dsh-deposit-row-header',
    templateUrl: 'deposit-row-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class DepositRowHeaderComponent {}
