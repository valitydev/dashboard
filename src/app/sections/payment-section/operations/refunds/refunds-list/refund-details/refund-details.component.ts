import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RefundSearchResult } from '@vality/swag-anapi-v2';

@Component({
    selector: 'dsh-refund-refund-details',
    templateUrl: 'refund-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class RefundDetailsComponent {
    @Input() refund: RefundSearchResult;
}
