import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RefundSearchResult } from '@vality/swag-anapi-v2';

@Component({
    selector: 'dsh-refund-row',
    templateUrl: 'refund-row.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefundRowComponent {
    @Input() refund: RefundSearchResult;
}
