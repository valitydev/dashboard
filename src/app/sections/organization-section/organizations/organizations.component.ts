import { ChangeDetectionStrategy, Component, OnInit, isDevMode } from '@angular/core';

import { FetchOrganizationsService } from '@dsh/app/shared/services/fetch-organizations';

@Component({
    selector: 'dsh-organizations',
    templateUrl: 'organizations.component.html',
    styleUrls: ['organizations.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class OrganizationsComponent implements OnInit {
    organizations$ = this.fetchOrganizationsService.searchResult$;
    hasMore$ = this.fetchOrganizationsService.hasMore$;
    isLoading$ = this.fetchOrganizationsService.doSearchAction$;
    lastUpdated$ = this.fetchOrganizationsService.lastUpdated$;
    isDev = isDevMode();

    constructor(private fetchOrganizationsService: FetchOrganizationsService) {}

    ngOnInit() {
        this.fetchOrganizationsService.search();
    }

    refresh() {
        this.fetchOrganizationsService.refresh();
    }

    showMore() {
        this.fetchOrganizationsService.fetchMore();
    }
}
