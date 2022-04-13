import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Payout } from '@vality/swag-anapi-v2';

@Component({
    selector: 'dsh-payout-main-info',
    templateUrl: 'payout-main-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayoutMainInfoComponent {
    @Input() payout: Payout;
}
