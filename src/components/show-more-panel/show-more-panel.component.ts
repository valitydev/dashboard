import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'dsh-show-more-panel',
    templateUrl: 'show-more-panel.component.html',
    styleUrls: ['show-more-panel.component.scss'],
    standalone: false,
})
export class ShowMorePanelComponent {
    @Input() isLoading = false;

    @Output() showMore: EventEmitter<void> = new EventEmitter<void>();

    getMore(): void {
        this.showMore.emit();
    }
}
