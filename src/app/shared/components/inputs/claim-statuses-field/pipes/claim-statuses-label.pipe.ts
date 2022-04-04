import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { StatusModificationUnit } from '@vality/swag-claim-management';
import { Observable, of } from 'rxjs';

import { OPTION_LABELS } from '../types/option-labels';

@Pipe({ name: 'claimStatusesLabelPipe' })
export class ClaimStatusesLabelPipe implements PipeTransform {
    constructor(private translocoService: TranslocoService) {}

    transform(value: StatusModificationUnit.StatusEnum): Observable<string> {
        if (!value) return of('');
        return this.translocoService.selectTranslate(`statuses.${OPTION_LABELS[value]}`, {}, 'claim-status-filter');
    }
}
