import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Report } from '@vality/swag-anapi-v2';
import { Observable, of } from 'rxjs';

import { OPTION_LABELS } from '../types/option-labels';

@Pipe({ name: 'reportTypesLabelPipe' })
export class ReportTypesLabelPipe implements PipeTransform {
    constructor(private translocoService: TranslocoService) {}

    transform(value: Report.ReportTypeEnum): Observable<string> {
        if (!value) return of('');
        return this.translocoService.selectTranslate(`types.${OPTION_LABELS[value]}`, {}, 'report-types-field');
    }
}
