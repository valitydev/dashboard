import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RefundSearchResult } from '@vality/swag-anapi-v2';

@Component({
    selector: 'dsh-refund-main-info',
    templateUrl: 'refund-main-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class RefundMainInfoComponent {
    @Input() refund: RefundSearchResult;
}
