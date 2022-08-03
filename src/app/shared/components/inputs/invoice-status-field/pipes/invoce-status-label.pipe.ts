import { Pipe, PipeTransform } from '@angular/core';
import { InvoiceStatus } from '@vality/swag-anapi-v2';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { AnapiDictionaryService } from '@dsh/api/anapi';

@Pipe({ name: 'invoiceStatusLabel' })
export class InvoiceStatusLabelPipe implements PipeTransform {
    constructor(private anapiDictionaryService: AnapiDictionaryService) {}

    transform(value: InvoiceStatus.StatusEnum): Observable<string> {
        if (!value) return of('');
        return this.anapiDictionaryService.invoiceStatus$.pipe(map((d) => d[value]));
    }
}
