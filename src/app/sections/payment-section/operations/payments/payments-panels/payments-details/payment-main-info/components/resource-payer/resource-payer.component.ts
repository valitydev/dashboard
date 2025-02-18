import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PaymentResourcePayer } from '@vality/swag-anapi-v2';

@Component({
    selector: 'dsh-resource-payer',
    templateUrl: './resource-payer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ResourcePayerComponent {
    @Input() payer: PaymentResourcePayer;
}
