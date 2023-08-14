import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { StatusModificationUnit } from '@vality/swag-claim-management';
import { Observable, of } from 'rxjs';

import { OPTION_LABELS } from '../types/option-labels';

@Pipe({ name: 'claimStatusesLabelPipe' })
export class ClaimStatusesLabelPipe implements PipeTransform {
    private optionLabels = this.getOptionLabels();

    constructor(private translocoService: TranslocoService) {}

    transform(value: StatusModificationUnit.StatusEnum): Observable<string> {
        if (!value) return of('');
        return this.optionLabels[OPTION_LABELS[value]];
    }

    private getOptionLabels(): Record<StatusModificationUnit.StatusEnum, Observable<string>> {
        return {
            pending: this.translocoService.selectTranslate(
                'claimStatusesField.statuses.pending',
                null,
                'components',
            ),
            review: this.translocoService.selectTranslate(
                'claimStatusesField.statuses.review',
                null,
                'components',
            ),
            pendingAcceptance: this.translocoService.selectTranslate(
                'claimStatusesField.statuses.pendingAcceptance',
                null,
                'components',
            ),
            revoked: this.translocoService.selectTranslate(
                'claimStatusesField.statuses.revoked',
                null,
                'components',
            ),
            denied: this.translocoService.selectTranslate(
                'claimStatusesField.statuses.denied',
                null,
                'components',
            ),
            accepted: this.translocoService.selectTranslate(
                'claimStatusesField.statuses.accepted',
                null,
                'components',
            ),
        };
    }
}
