import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Pipe, PipeTransform } from '@angular/core';
import { AnapiDictionaryService } from '@dsh/app/api/anapi';

import { InvoiceStatus } from '@vality/swag-anapi-v2';

@Pipe({
    name: 'invoiceStatusLabel',
    standalone: false,
})
export class InvoiceStatusLabelPipe implements PipeTransform {
    constructor(private anapiDictionaryService: AnapiDictionaryService) {}

    transform(value: InvoiceStatus.StatusEnum): Observable<string> {
        if (!value) {
            return of('');
        }
        return this.anapiDictionaryService.invoiceStatus$.pipe(map((d) => d[value]));
    }
}
