import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentInstitution } from '@vality/swag-payments';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { shareReplayRefCount } from '@dsh/operators';

import RealmEnum = PaymentInstitution.RealmEnum;

@Injectable()
export class PaymentInstitutionRealmService {
    realm$: Observable<RealmEnum> = this.route.params.pipe(
        map(({ realm }) => realm as RealmEnum),
        shareReplayRefCount()
    );

    constructor(private route: ActivatedRoute) {}
}
