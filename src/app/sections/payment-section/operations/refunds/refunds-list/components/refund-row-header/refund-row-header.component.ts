import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dsh-refund-row-header',
    templateUrl: 'refund-row-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class RefundRowHeaderComponent {}
