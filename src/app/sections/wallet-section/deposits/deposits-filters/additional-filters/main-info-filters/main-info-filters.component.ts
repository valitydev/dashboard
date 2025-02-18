import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroupByValue } from '@vality/ng-core';

import { MainInfoFilters } from './types/main-info-filters';

@Component({
    selector: 'dsh-main-filters',
    templateUrl: './main-info-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class MainInfoFiltersComponent {
    @Input() form: FormGroupByValue<MainInfoFilters>;
}
