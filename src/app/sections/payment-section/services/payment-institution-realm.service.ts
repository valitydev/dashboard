import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentInstitution } from '@vality/swag-payments';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { shareReplayRefCount } from '@dsh/operators';

import RealmEnum = PaymentInstitution.RealmEnum;

@Injectable()
export class PaymentInstitutionRealmService {
    realm$: Observable<RealmEnum> = this.route.params.pipe(pluck('realm'), shareReplayRefCount());

    constructor(private route: ActivatedRoute) {}
}
