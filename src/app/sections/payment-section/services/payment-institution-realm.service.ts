import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentInstitution } from '@vality/swag-payments';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { shareReplayRefCount } from '@dsh/app/custom-operators';

import RealmEnum = PaymentInstitution.RealmEnum;

@Injectable()
export class PaymentInstitutionRealmService {
    realm$: Observable<RealmEnum | undefined> = this.route.params.pipe(
        map(({ realm }) => realm as RealmEnum),
        shareReplayRefCount(),
    );

    constructor(private route: ActivatedRoute) {}
}
