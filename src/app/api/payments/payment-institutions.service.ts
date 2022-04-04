import { Injectable } from '@angular/core';
import { PaymentInstitutionsService as ApiPaymentInstitutionsService } from '@vality/swag-payments';
import { BehaviorSubject, defer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { IdGeneratorService } from '@dsh/app/shared';
import { publishReplayRefCount } from '@dsh/operators';

import { createDefaultHeaders } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class PaymentInstitutionsService {
    paymentInstitutions$ = defer(() => this.reload$).pipe(
        switchMap(() =>
            this.paymentInstitutionsService.getPaymentInstitutions({ xRequestID: this.idGenerator.shortUuid() })
        ),
        publishReplayRefCount()
    );

    private reload$ = new BehaviorSubject<void>(undefined);

    constructor(
        private paymentInstitutionsService: ApiPaymentInstitutionsService,
        private idGenerator: IdGeneratorService
    ) {
        this.paymentInstitutionsService.defaultHeaders = createDefaultHeaders();
    }

    reload(): void {
        this.reload$.next();
    }
}
