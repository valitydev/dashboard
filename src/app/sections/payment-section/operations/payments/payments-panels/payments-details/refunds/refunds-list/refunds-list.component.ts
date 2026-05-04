import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Refund } from '@vality/swag-payments';
import isEmpty from 'lodash-es/isEmpty';

@Component({
    selector: 'dsh-refunds-list',
    templateUrl: './refunds-list.component.html',
    styleUrls: ['./refunds-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class RefundsListComponent {
    @Input() list: Refund[];
    @Input() loading: boolean;
    @Input() hasMore: boolean;

    @Output() showMore = new EventEmitter<void>();

    get isEmptyList(): boolean {
        return isEmpty(this.list);
    }

    showMoreElements(): void {
        this.showMore.emit();
    }
}
