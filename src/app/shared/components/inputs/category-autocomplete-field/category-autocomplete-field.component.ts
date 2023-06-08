import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { Category } from '@vality/swag-payments';
import { coerceBoolean } from 'coerce-property';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CategoriesService } from '@dsh/app/api/payments';
import { shareReplayRefCount } from '@dsh/app/custom-operators';
import { Option } from '@dsh/components/form-controls/select-search-field';
import { provideValueAccessor } from '@dsh/utils';

@Component({
    selector: 'dsh-category-autocomplete-field',
    templateUrl: 'category-autocomplete-field.component.html',
    providers: [provideValueAccessor(() => CategoryAutocompleteFieldComponent)],
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
