import { Injectable } from '@angular/core';
import { Category } from '@vality/swag-payments';
import { ReplaySubject, combineLatest, defer } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { CategoriesService } from '@dsh/app/api/payments';

@Injectable()
export class CategoryService {
    category$ = combineLatest([
        defer(() => this.categoryID$),
        this.categoriesService.categories$,
    ]).pipe(
        map(([categoryID, categories]) =>
            categories.find((c: Category) => c.categoryID === categoryID),
        ),
        shareReplay({ refCount: true, bufferSize: 1 }),
    );

    private categoryID$ = new ReplaySubject<number>();

    constructor(private categoriesService: CategoriesService) {}

    updateID(categoryID: number): void {
        this.categoryID$.next(categoryID);
    }
}
