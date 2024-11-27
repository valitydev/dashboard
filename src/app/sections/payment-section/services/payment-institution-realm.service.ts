import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentInstitution } from '@vality/swag-payments';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import RealmEnum = PaymentInstitution.RealmEnum;

@Injectable()
export class PaymentInstitutionRealmService {
    realm$: Observable<RealmEnum | undefined> = this.route.params.pipe(
        map(({ realm }) => realm as RealmEnum),
        shareReplay({ refCount: true, bufferSize: 1 }),
    );

    constructor(private route: ActivatedRoute) {}
}
