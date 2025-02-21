import { Injectable } from '@angular/core';
import { Shop } from '@vality/swag-payments';
import { Observable, combineLatest } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { ShopsDataService } from '@dsh/app/shared';

import { getShopsByRealm } from '../operations/operators';

import { PaymentInstitutionRealmService } from './payment-institution-realm.service';

@Injectable()
export class RealmShopsService {
    shops$: Observable<Shop[]> = combineLatest([
        this.shopsDataService.shops$,
        this.realmService.realm$,
    ]).pipe(
        map(([shops, realm]) => (realm ? getShopsByRealm(shops, realm) : [])),
        shareReplay({ refCount: true, bufferSize: 1 }),
    );

    constructor(
        private shopsDataService: ShopsDataService,
        private realmService: PaymentInstitutionRealmService,
    ) {}
}
