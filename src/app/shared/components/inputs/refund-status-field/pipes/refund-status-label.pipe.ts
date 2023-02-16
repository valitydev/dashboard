import { Pipe, PipeTransform } from '@angular/core';
import { RefundStatus } from '@vality/swag-anapi-v2';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { AnapiDictionaryService } from '@dsh/api/anapi';

@Pipe({ name: 'refundStatusLabel' })
export class RefundStatusLabelPipe implements PipeTransform {
    constructor(private anapiDictionaryService: AnapiDictionaryService) {}

    transform(value: RefundStatus.StatusEnum): Observable<string> {
        if (!value) return of('');
        return this.anapiDictionaryService.refundStatus$.pipe(map((d) => d[value]));
    }
}
