import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Deposit } from '@vality/swag-wallets';
import isEmpty from 'lodash-es/isEmpty';

@Component({
    selector: 'dsh-deposit-panels',
    templateUrl: 'deposit-panels.component.html',
    standalone: false,
})
export class DepositPanelsComponent {
    @Input() list: Deposit[];
    @Input() isLoading: boolean;
    @Input() hasMore: boolean;
    @Input() expandedId: number;

    @Output() showMore = new EventEmitter<void>();
    @Output() expandedIdChanged = new EventEmitter<number>();

    get isEmptyList(): boolean {
        return isEmpty(this.list);
    }

    track(index: number, item: Deposit): string {
        return item.id;
    }

    showMoreElements(): void {
        this.showMore.emit();
    }

    expandedIndexChange(id: number): void {
        this.expandedIdChanged.emit(id);
    }
}
