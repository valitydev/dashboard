import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { StatusModificationUnit } from '@vality/swag-claim-management';

import { DictionaryService } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class ClaimManagementDictionaryService {
    claimStatus$ = this.dictionaryService.create<StatusModificationUnit.StatusEnum>(() => ({
        accepted: this.t.translate('claimManagement.claimStatus.accepted', null, 'dictionary'),
        denied: this.t.translate('claimManagement.claimStatus.denied', null, 'dictionary'),
        pending: this.t.translate('claimManagement.claimStatus.pending', null, 'dictionary'),
        pendingAcceptance: this.t.translate('claimManagement.claimStatus.pendingAcceptance', null, 'dictionary'),
        review: this.t.translate('claimManagement.claimStatus.review', null, 'dictionary'),
        revoked: this.t.translate('claimManagement.claimStatus.revoked', null, 'dictionary'),
    }));

    constructor(private t: TranslocoService, private dictionaryService: DictionaryService) {}
}
