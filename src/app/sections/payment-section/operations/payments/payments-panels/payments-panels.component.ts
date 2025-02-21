import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PaymentSearchResult } from '@vality/swag-anapi-v2';
import isEmpty from 'lodash-es/isEmpty';

import { getPaymentId } from '../utils/get-payment-id';

@Component({
    selector: 'dsh-payments-panels',
    templateUrl: 'payments-panels.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class PaymentsPanelsComponent {
    @Input() list: PaymentSearchResult[];
    @Input() isLoading: boolean;
    @Input() hasMore: boolean;
    @Input() expandedId: number;

    @Output() showMore = new EventEmitter<void>();
    @Output() expandedIdChanged = new EventEmitter<number>();

    get isEmptyList(): boolean {
        return isEmpty(this.list);
    }

    trackPayment(index: number, item: PaymentSearchResult): string {
        return `${getPaymentId(item)}${item.status}`;
    }

    showMoreElements(): void {
        this.showMore.emit();
    }

    expandedIndexChange(id: number): void {
        this.expandedIdChanged.emit(id);
    }
}
