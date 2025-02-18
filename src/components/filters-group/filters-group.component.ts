import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dsh-filters-group',
    templateUrl: 'filters-group.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class FiltersGroupComponent {}
