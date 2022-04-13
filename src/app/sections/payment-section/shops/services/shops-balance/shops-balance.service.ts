import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AnalyticsService } from '@dsh/api/anapi';

import { ShopBalance } from '../../types/shop-balance';

@Injectable()
export class ShopsBalanceService {
    constructor(private analyticsService: AnalyticsService) {}

    getBalances(shopIDs: string[]): Observable<ShopBalance[]> {
        return this.analyticsService.getCurrentShopBalances({ shopIDs }).pipe(
            map(({ result }) =>
                result.map(({ id, amountResults = [] }) => ({
                    id,
                    data: amountResults?.length ? amountResults[0] : null,
                }))
            ),
            catchError((err) => {
                console.error(err);
                return of([]);
            })
        );
    }
}
