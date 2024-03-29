import { Shop } from '@vality/swag-payments';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ShopInfo {
    shopID: string;
    name: string;
}

const toShopInfo = (s: Shop[]) =>
    s.map(({ id, details: { name } }): ShopInfo => ({ shopID: id, name }));

export const mapToShopInfo = (s: Observable<Shop[]>): Observable<ShopInfo[]> =>
    s.pipe(map(toShopInfo));
