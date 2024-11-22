import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { NotifyLogService } from '@vality/ng-core';
import { Observable } from 'rxjs';

@Injectable()
/**
 * @deprecated
 */
export class ErrorService {
    constructor(
        private log: NotifyLogService,
        private transloco: TranslocoService,
    ) {}

    error(error: unknown) {
        let resError: Observable<string>;
        if (error instanceof HttpErrorResponse) {
            resError = this.transloco.selectTranslate('error.httpError', null, 'services');
        } else {
            resError = this.transloco.selectTranslate('error.error', null, 'services');
        }
        this.log.error(error, resError);
    }
}
