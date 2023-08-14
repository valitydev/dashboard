import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Claim } from '@vality/swag-claim-management';

import { ClaimManagementDictionaryService } from '@dsh/app/api/claim-management';

@Component({
    selector: 'dsh-claim-row',
    templateUrl: 'claim-row.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimRowComponent {
    @Input() claim: Claim;

    claimStatusDict$ = this.claimManagementDictionaryService.claimStatus$;

    constructor(private claimManagementDictionaryService: ClaimManagementDictionaryService) {}
}
