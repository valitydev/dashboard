import { ChangeDetectionStrategy, Component, Input, booleanAttribute } from '@angular/core';
import { FormControlSuperclass, Option, createControlProviders } from '@vality/ng-core';
import { Category } from '@vality/swag-payments';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CategoriesService } from '@dsh/app/api/payments';
import { shareReplayRefCount } from '@dsh/app/custom-operators';

@Component({
    selector: 'dsh-category-autocomplete-field',
    templateUrl: 'category-autocomplete-field.component.html',
    providers: createControlProviders(() => CategoryAutocompleteFieldComponent),
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryAutocompleteFieldComponent extends FormControlSuperclass<Category> {
    @Input() label: string;
    @Input({ transform: booleanAttribute }) required = false;

    options$: Observable<Option<Category>[]> = this.categoriesService.categories$.pipe(
        map((categories) =>
            categories.map((category) => ({
                label: `${category.categoryID} - ${category.name}`,
                value: category,
            })),
        ),
        shareReplayRefCount(),
    );

    constructor(private categoriesService: CategoriesService) {
        super();
    }
}
