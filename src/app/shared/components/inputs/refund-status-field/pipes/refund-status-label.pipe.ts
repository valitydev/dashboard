import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { RefundStatus } from '@vality/swag-dark-api';
import { Observable, of } from 'rxjs';

@Pipe({ name: 'refundStatusLabel' })
export class RefundStatusLabelPipe implements PipeTransform {
    constructor(private translocoService: TranslocoService) {}

    transform(value: RefundStatus.StatusEnum): Observable<string> {
        if (!value) return of('');
        return this.translocoService.selectTranslate(`statuses.${value}`, {}, 'refund-status-field');
    }
}
