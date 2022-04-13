import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MobileCommerceDetails } from '@vality/swag-anapi-v2';

@Component({
    selector: 'dsh-mobile-commerce',
    templateUrl: 'mobile-commerce.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileCommerceComponent {
    @Input() details: MobileCommerceDetails;
}
