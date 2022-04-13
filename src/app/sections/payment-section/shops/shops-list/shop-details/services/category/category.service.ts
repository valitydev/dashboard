import { Injectable } from '@angular/core';
import { Category } from '@vality/swag-payments';
import { combineLatest, defer, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { CategoriesService } from '@dsh/api/payments';
import { shareReplayRefCount } from '@dsh/operators';

@Injectable()
export class CategoryService {
    category$ = combineLatest([defer(() => this.categoryID$), this.categoriesService.categories$]).pipe(
        map(([categoryID, categories]) => categories.find((c: Category) => c.categoryID === categoryID)),
        shareReplayRefCount()
    );

    private categoryID$ = new ReplaySubject<number>();

    constructor(private categoriesService: CategoriesService) {}

    updateID(categoryID: number): void {
        this.categoryID$.next(categoryID);
    }
}
