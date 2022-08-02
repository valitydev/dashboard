import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RefundSearchResult } from '@vality/swag-payments';

import { AnapiDictionaryService } from '@dsh/api/anapi';

@Component({
    selector: 'dsh-refund-details',
    templateUrl: 'refund-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefundDetailsComponent {
    @Input() refund: RefundSearchResult;
    refundStatusDict$ = this.anapiDictionaryService.refundStatus$;

    constructor(private anapiDictionaryService: AnapiDictionaryService) {}
}
