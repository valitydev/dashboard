import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-empty-search-result',
    templateUrl: 'empty-search-result.component.html',
    styleUrls: ['empty-search-result.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class EmptySearchResultComponent {
    @Input()
    text?: string;
}
