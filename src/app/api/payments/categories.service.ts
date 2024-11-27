import { Injectable } from '@angular/core';
import { CategoriesService as ApiCategoriesService } from '@vality/swag-payments';
import { BehaviorSubject, defer } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';

import { createApi } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class CategoriesService extends createApi(ApiCategoriesService) {
    categories$ = defer(() => this.reloadCategories$).pipe(
        switchMap(() => this.getCategories()),
        shareReplay({ refCount: true, bufferSize: 1 }),
    );

    private reloadCategories$ = new BehaviorSubject<void>(undefined);

    reload(): void {
        this.reloadCategories$.next();
    }
}
