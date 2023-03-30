import { Injectable } from '@angular/core';
import { Shop } from '@vality/swag-payments';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ShopsDataService } from '@dsh/app/shared';
import { shareReplayRefCount } from '@dsh/operators';

import { PaymentInstitutionRealmService } from './payment-institution-realm.service';
import { getShopsByRealm } from '../operations/operators';

@Injectable()
export class RealmShopsService {
    shops$: Observable<Shop[]> = combineLatest([this.shopsDataService.shops$, this.realmService.realm$]).pipe(
        map(([shops, realm]) => (realm ? getShopsByRealm(shops, realm) : [])),
        shareReplayRefCount()
    );

    constructor(private shopsDataService: ShopsDataService, private realmService: PaymentInstitutionRealmService) {}
}
