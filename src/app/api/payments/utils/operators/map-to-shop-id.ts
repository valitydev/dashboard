import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Shop } from '@vality/swag-payments';

export const mapToShopId = (s: Observable<Shop[]>): Observable<string[]> =>
    s.pipe(map((shops) => shops.map((shop) => shop.id)));
