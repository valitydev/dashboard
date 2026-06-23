import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AnapiDictionaryService } from '@dsh/app/api/anapi';

import { Refund } from '@vality/swag-payments';

@Component({
    selector: 'dsh-refund-details',
    templateUrl: 'refund-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class RefundDetailsComponent {
    @Input() refund: Refund;
    refundStatusDict$ = this.anapiDictionaryService.refundStatus$;

    constructor(private anapiDictionaryService: AnapiDictionaryService) {}
}
