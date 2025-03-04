import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-payment-detail-header',
    templateUrl: 'payment-detail-header.component.html',
    changeDetection: ChangeDetectionStrategy.Default,
    standalone: false,
})
export class PaymentDetailHeaderComponent {
    @Input() id: string;
    @Input() changedDate: Date;
}
