import { Shop as ApiShop } from '@vality/swag-payments';
import { getTestScheduler } from 'jasmine-marbles';
import { Observable, of, scheduled } from 'rxjs';

export class MockFetchShops {
    allShops$: Observable<ApiShop[]>;

    constructor(shops: ApiShop[]) {
        this.allShops$ = scheduled(of(shops), getTestScheduler());
    }
}
