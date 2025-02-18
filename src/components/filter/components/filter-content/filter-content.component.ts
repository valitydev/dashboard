import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    booleanAttribute,
} from '@angular/core';

@Component({
    selector: 'dsh-filter-content',
    templateUrl: 'filter-content.component.html',
    styleUrls: ['filter-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class FilterContentComponent {
    @Input({ transform: booleanAttribute }) noClearButton = false;

    @Output() save = new EventEmitter<MouseEvent>();
    @Output() clear = new EventEmitter<MouseEvent>();
}
