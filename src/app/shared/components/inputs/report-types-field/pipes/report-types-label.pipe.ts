import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Pipe, PipeTransform } from '@angular/core';
import { AnapiDictionaryService } from '@dsh/app/api/anapi';

import { Report } from '@vality/swag-anapi-v2';

@Pipe({
    name: 'reportTypesLabelPipe',
    standalone: false,
})
export class ReportTypesLabelPipe implements PipeTransform {
    constructor(private anapiDictionaryService: AnapiDictionaryService) {}

    transform(value: Report.ReportTypeEnum): Observable<string> {
        if (!value) {
            return of('');
        }
        return this.anapiDictionaryService.reportType$.pipe(map((d) => d[value]));
    }
}
