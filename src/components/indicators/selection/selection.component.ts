import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { coerceBoolean } from 'coerce-property';

@Component({
    selector: 'dsh-selection',
    templateUrl: 'selection.component.html',
    styleUrls: ['selection.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectionComponent {
    @Input() @coerceBoolean selected: boolean;
}
