import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Pipe, PipeTransform } from '@angular/core';
import { AnapiDictionaryService } from '@dsh/app/api/anapi';

import { RefundStatus } from '@vality/swag-anapi-v2';

@Pipe({
    name: 'refundStatusLabel',
    standalone: false,
})
export class RefundStatusLabelPipe implements PipeTransform {
    constructor(private anapiDictionaryService: AnapiDictionaryService) {}

    transform(value: RefundStatus.StatusEnum): Observable<string> {
        if (!value) {
            return of('');
        }
        return this.anapiDictionaryService.refundStatus$.pipe(map((d) => d[value]));
    }
}
