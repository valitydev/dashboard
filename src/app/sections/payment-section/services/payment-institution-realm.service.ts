import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentInstitution } from '@vality/swag-payments';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import RealmEnum = PaymentInstitution.RealmEnum;

@Injectable()
export class PaymentInstitutionRealmService {
    realm$: Observable<RealmEnum | undefined> = this.route.params.pipe(
        map(() => this.route.snapshot.params.realm as RealmEnum)
    );

    constructor(private route: ActivatedRoute) {}
}
