import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RefundSearchResult } from '@vality/swag-anapi-v2';

import { AnapiDictionaryService } from '@dsh/app/api/anapi';

@Component({
    selector: 'dsh-refund-row',
    templateUrl: 'refund-row.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class RefundRowComponent {
    @Input() refund: RefundSearchResult;
    refundStatusDict$ = this.anapiDictionaryService.refundStatus$;

    constructor(private anapiDictionaryService: AnapiDictionaryService) {}
}
