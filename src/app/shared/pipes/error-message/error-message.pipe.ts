import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { Observable, of } from 'rxjs';

import { CommonError } from '@dsh/app/shared';

@Pipe({
    name: 'errorMessage',
    standalone: false,
})
/**
 * @deprecated
 */
export class ErrorMessagePipe implements PipeTransform {
    constructor(private transloco: TranslocoService) {}

    transform(err: unknown): Observable<string> {
        if (!err) {
            return of('');
        }
        if (err instanceof CommonError) {
            return of(err.message);
        }
        return this.transloco.selectTranslate('errorMessage.errorOccurred', null, 'pipes');
    }
}
