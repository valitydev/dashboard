import { Observable } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { ShopsDataService } from '@dsh/app/shared';

import { PaymentInstitution, Shop } from '@vality/swag-payments';

import { getShopsByRealm } from '../operations/operators';

import { PaymentInstitutionRealmService } from './payment-institution-realm.service';

@Injectable()
export class RealmShopsService {
    shops$: Observable<Shop[]> = this.realmService.realm$.pipe(
        switchMap((realm) => this.getShopsByRealm(realm)),
        shareReplay({ refCount: true, bufferSize: 1 }),
    );
    hasTestShops$ = this.getShopsByRealm(PaymentInstitution.RealmEnum.Test).pipe(
        map((shops) => !!shops?.length),
        shareReplay({ refCount: true, bufferSize: 1 }),
    );

    constructor(
        private shopsDataService: ShopsDataService,
        private realmService: PaymentInstitutionRealmService,
    ) {}

    reloadShops(): void {
        this.shopsDataService.reloadShops();
    }

    getShopsByRealm(realm: PaymentInstitution.RealmEnum) {
        return this.shopsDataService.shops$.pipe(
            map((shops) => (realm ? getShopsByRealm(shops, realm) : [])),
        );
    }
}
