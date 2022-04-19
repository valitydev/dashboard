import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Payout } from '@vality/swag-anapi-v2';

@Component({
    selector: 'dsh-payouts-details',
    templateUrl: 'payouts-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayoutsDetailsComponent {
    @Input() payout: Payout;
    @Output() createPayoutReport: EventEmitter<Payout> = new EventEmitter<Payout>();

    createReport(): void {
        this.createPayoutReport.emit(this.payout);
    }
}
