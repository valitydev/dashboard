import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Claim } from '@vality/swag-claim-management';
import isNil from 'lodash-es/isNil';

@Component({
    selector: 'dsh-claims-list',
    templateUrl: 'claims-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimsListComponent {
    @Input() claimList: Claim[];
    @Input() lastUpdated: string;
    @Input() isLoading: boolean;
    @Input() hasMore: boolean;
    @Input() expandedId: number;

    @Output() refresh = new EventEmitter<void>();
    @Output() showMore = new EventEmitter<void>();

    get isListExist(): boolean {
        return !isNil(this.claimList);
    }

    get isEmptyList(): boolean {
        return this.isListExist && this.claimList.length === 0;
    }

    refreshList(): void {
        this.refresh.emit();
    }

    showMoreElements(): void {
        this.showMore.emit();
    }
}
