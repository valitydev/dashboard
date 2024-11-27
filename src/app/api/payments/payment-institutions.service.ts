import { Injectable } from '@angular/core';
import { PaymentInstitutionsService as ApiPaymentInstitutionsService } from '@vality/swag-payments';
import { BehaviorSubject, defer } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';

import { createApi } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class PaymentInstitutionsService extends createApi(ApiPaymentInstitutionsService) {
    paymentInstitutions$ = defer(() => this.reload$).pipe(
        switchMap(() => this.getPaymentInstitutions()),
        shareReplay({ refCount: true, bufferSize: 1 }),
    );

    private reload$ = new BehaviorSubject<void>(undefined);

    reload(): void {
        this.reload$.next();
    }
}
