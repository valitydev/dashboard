import { Injectable } from '@angular/core';
import { PaymentInstitution } from '@vality/swag-payments';
import { Observable, Subject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { PaymentInstitutionRealmService } from './payment-institution-realm.service';

import RealmEnum = PaymentInstitution.RealmEnum;

/**
 * @deprecated
 */
@Injectable()
export class RealmMixService<T> {
    mixedValue$: Observable<T & { realm: RealmEnum }>;

    private mix$ = new Subject<T>();

    constructor(private paymentInstitutionRealmService: PaymentInstitutionRealmService) {
        this.mixedValue$ = combineLatest([
            this.paymentInstitutionRealmService.realm$,
            this.mix$,
        ]).pipe(
            map(([realm, value]) => ({
                ...value,
                realm,
            })),
        );
    }

    mix(value: T): void {
        this.mix$.next(value);
    }
}
