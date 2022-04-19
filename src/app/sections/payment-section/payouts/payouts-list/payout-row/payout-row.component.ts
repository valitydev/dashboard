import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Payout } from '@vality/swag-anapi-v2';

@Component({
    selector: 'dsh-payout-row',
    templateUrl: 'payout-row.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayoutRowComponent {
    @Input() payout: Payout;
}
