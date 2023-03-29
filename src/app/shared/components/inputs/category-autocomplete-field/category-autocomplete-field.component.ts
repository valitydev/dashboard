import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { provideValueAccessor, WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { Category } from '@vality/swag-payments';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CategoriesService } from '@dsh/api/payments';
import { Option } from '@dsh/components/form-controls/select-search-field';
import { shareReplayRefCount } from '@dsh/operators';
import { coerceBoolean } from '@dsh/utils';

@Component({
    selector: 'dsh-category-autocomplete-field',
    templateUrl: 'category-autocomplete-field.component.html',
    providers: [provideValueAccessor(CategoryAutocompleteFieldComponent)],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryAutocompleteFieldComponent extends WrappedFormControlSuperclass<Category> {
    @Input() label: string;
    @Input() @coerceBoolean required = false;

    options$: Observable<Option<Category>[]> = this.categoriesService.categories$.pipe(
        map((categories) =>
            categories.map((category) => ({ label: `${category.categoryID} - ${category.name}`, value: category }))
        ),
        shareReplayRefCount()
    );

    constructor(private categoriesService: CategoriesService) {
        super();
    }
}
