import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Organization } from '@vality/swag-organizations';
import { Observable } from 'rxjs';

import { ExpandedIdManager } from '@dsh/app/shared/services';
import { FetchOrganizationsService } from '@dsh/app/shared/services/fetch-organizations';

@Injectable()
export class OrganizationsExpandedIdManager extends ExpandedIdManager<Organization> {
    constructor(
        route: ActivatedRoute,
        router: Router,
        private fetchOrganizationsService: FetchOrganizationsService,
    ) {
        super(route, router);
    }

    protected fragmentNotFound(): void {
        this.fetchOrganizationsService.fetchMore();
    }

    protected get hasMore(): Observable<boolean> {
        return this.fetchOrganizationsService.hasMore$;
    }

    protected get dataSet$(): Observable<Organization[]> {
        return this.fetchOrganizationsService.searchResult$;
    }
}
