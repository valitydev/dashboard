import { ChangeDetectionStrategy, Component, Input, booleanAttribute } from '@angular/core';

@Component({
    selector: 'dsh-filter-button',
    templateUrl: 'filter-button.component.html',
    styleUrls: ['filter-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class FilterButtonComponent {
    @Input({ transform: booleanAttribute }) active = false;
    @Input({ transform: booleanAttribute }) disabled = false;
}
