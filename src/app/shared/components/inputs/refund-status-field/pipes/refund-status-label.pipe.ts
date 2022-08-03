import { Pipe, PipeTransform } from '@angular/core';
import { RefundStatus } from '@vality/swag-dark-api';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { DarkApiDictionaryService } from '@dsh/api/dark-api/dark-api-dictionary.service';

@Pipe({ name: 'refundStatusLabel' })
export class RefundStatusLabelPipe implements PipeTransform {
    constructor(private darkApiDictionaryService: DarkApiDictionaryService) {}

    transform(value: RefundStatus.StatusEnum): Observable<string> {
        if (!value) return of('');
        return this.darkApiDictionaryService.refundStatus$.pipe(map((d) => d[value]));
    }
}
