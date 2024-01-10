import { ChangeDetectionStrategy, Component, Input, booleanAttribute } from '@angular/core';

@Component({
    selector: 'dsh-selection',
    templateUrl: 'selection.component.html',
    styleUrls: ['selection.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectionComponent {
    @Input({ transform: booleanAttribute }) selected: boolean;
}
