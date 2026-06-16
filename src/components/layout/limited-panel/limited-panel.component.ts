import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexModule } from 'ng-flex-layout';

@Component({
    selector: 'dsh-limited-panel',
    templateUrl: 'limited-panel.component.html',
    styleUrls: ['limited-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FlexModule, TranslocoModule],
})
export class LimitedPanelComponent {
    @Output() showMore = new EventEmitter<void>();
    @Input() hasMore = false;

    showMoreItems(): void {
        this.showMore.emit();
    }
}
