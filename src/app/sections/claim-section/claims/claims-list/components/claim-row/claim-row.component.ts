import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Claim } from '@vality/swag-claim-management';

import { ClaimManagementDictionaryService } from '@dsh/api/claim-management';

@Component({
    selector: 'dsh-claim-row',
    templateUrl: 'claim-row.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimRowComponent {
    @Input() claim: Claim;

    @Output() goToClaimDetails: EventEmitter<number> = new EventEmitter();

    claimStatusDict$ = this.claimManagementDictionaryService.claimStatus$;

    constructor(private claimManagementDictionaryService: ClaimManagementDictionaryService) {}
}
