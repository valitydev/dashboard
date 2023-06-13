import { PaymentInstitution, Shop } from '@vality/swag-payments';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { toLiveShops, toTestShops } from '@dsh/app/api/payments';

import RealmEnum = PaymentInstitution.RealmEnum;

export function getShopsByRealm(shops: Shop[], realm: RealmEnum): Shop[] {
    switch (realm) {
        case RealmEnum.Test:
            return toTestShops(shops);
        case RealmEnum.Live:
            return toLiveShops(shops);
        default:
            console.error(`Unknown PaymentInstitutionRealm: ${realm}`);
            return [];
    }
}

export const filterShopsByRealm =
    (shops$: Observable<Shop[]>) =>
    (s: Observable<RealmEnum>): Observable<Shop[]> =>
        s.pipe(switchMap((realm) => shops$.pipe(map((shops) => getShopsByRealm(shops, realm)))));
