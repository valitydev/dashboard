import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Output, EventEmitter, Input } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexModule } from 'ng-flex-layout';

@Component({
    selector: 'dsh-limited-panel',
    templateUrl: 'limited-panel.component.html',
    styleUrls: ['limited-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FlexModule, TranslocoModule, CommonModule],
})
export class LimitedPanelComponent {
    @Output() showMore = new EventEmitter<void>();
    @Input() hasMore = false;

    showMoreItems(): void {
        this.showMore.emit();
    }
}
