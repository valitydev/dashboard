import { Injectable } from '@angular/core';
import { CategoriesService as ApiCategoriesService } from '@vality/swag-payments';
import { BehaviorSubject, defer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { IdGeneratorService } from '@dsh/app/shared';
import { publishReplayRefCount } from '@dsh/operators';

import { createDefaultHeaders } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class CategoriesService {
    categories$ = defer(() => this.reloadCategories$).pipe(
        switchMap(() => this.categoriesService.getCategories({ xRequestID: this.idGenerator.shortUuid() })),
        publishReplayRefCount()
    );

    private reloadCategories$ = new BehaviorSubject<void>(undefined);

    constructor(private categoriesService: ApiCategoriesService, private idGenerator: IdGeneratorService) {
        this.categoriesService.defaultHeaders = createDefaultHeaders();
    }

    reload(): void {
        this.reloadCategories$.next();
    }
}
