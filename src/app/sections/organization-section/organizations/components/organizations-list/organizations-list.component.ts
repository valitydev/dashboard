import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Organization } from '@vality/swag-organizations';

import { OrganizationsExpandedIdManager } from '../../services/organizations-expanded-id-manager/organizations-expanded-id-manager.service';

@Component({
    selector: 'dsh-organizations-list',
    templateUrl: 'organizations-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [OrganizationsExpandedIdManager],
    standalone: false,
})
export class OrganizationsListComponent {
    @Input() organizations: Organization[];

    @Output() changed = new EventEmitter<void>();

    expandedId$ = this.expandedIdManager.expandedId$;

    constructor(private expandedIdManager: OrganizationsExpandedIdManager) {}

    trackOrganization(idx: number, item: Organization): string {
        return item.id;
    }

    expandedIdChange(id: number): void {
        this.expandedIdManager.expandedIdChange(id);
    }
}
