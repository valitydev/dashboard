import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PayoutTool } from '@vality/swag-payments';

@Component({
    selector: 'dsh-payout-tool',
    templateUrl: 'payout-tool.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayoutToolComponent {
    @Input() payoutTool: PayoutTool;
}
