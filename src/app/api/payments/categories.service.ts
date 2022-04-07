import { Injectable } from '@angular/core';
import { CategoriesService as ApiCategoriesService } from '@vality/swag-payments';
import { BehaviorSubject, defer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { publishReplayRefCount } from '@dsh/operators';

import { createApi } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class CategoriesService extends createApi(ApiCategoriesService) {
    categories$ = defer(() => this.reloadCategories$).pipe(
        switchMap(() => this.getCategories()),
        publishReplayRefCount()
    );

    private reloadCategories$ = new BehaviorSubject<void>(undefined);

    reload(): void {
        this.reloadCategories$.next();
    }
}
