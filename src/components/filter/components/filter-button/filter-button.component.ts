import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { coerceBoolean } from 'coerce-property';

@Component({
    selector: 'dsh-filter-button',
    templateUrl: 'filter-button.component.html',
    styleUrls: ['filter-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterButtonComponent {
    @Input() @coerceBoolean active = false;
    @Input() @coerceBoolean disabled = false;
}
