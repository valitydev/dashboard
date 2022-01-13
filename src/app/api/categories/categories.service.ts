import { Injectable } from '@angular/core';
import { BehaviorSubject, defer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { CategoriesService as CategoriesApiService } from '@dsh/api-codegen/capi';
import { IdGeneratorService } from '@dsh/app/shared';
import { publishReplayRefCount } from '@dsh/operators';

@Injectable()
export class CategoriesService {
    categories$ = defer(() => this.reloadCategories$).pipe(
        switchMap(() => this.categoriesService.getCategories(this.idGenerator.shortUuid())),
        publishReplayRefCount()
    );

    private reloadCategories$ = new BehaviorSubject<void>(undefined);

    constructor(private categoriesService: CategoriesApiService, private idGenerator: IdGeneratorService) {}

    reload(): void {
        this.reloadCategories$.next();
    }
}
