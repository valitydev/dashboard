import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { Organization } from '@vality/swag-organizations';
import { combineLatest } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';
import { ContextOrganizationService } from '@dsh/app/shared/services';
import { FetchOrganizationsService } from '@dsh/app/shared/services/fetch-organizations';

const DISPLAYED_COUNT = 5;

@UntilDestroy()
@Component({
    selector: 'dsh-select-active-organization-dialog',
    templateUrl: 'select-active-organization-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.Default,
    providers: [FetchOrganizationsService, { provide: SEARCH_LIMIT, useValue: DISPLAYED_COUNT }],
})
export class SelectActiveOrganizationDialogComponent implements OnInit {
    organizations$ = this.fetchOrganizationsService.searchResult$;
    hasMore$ = this.fetchOrganizationsService.hasMore$;
    selectedOrganization: Organization;
    isLoading$ = this.fetchOrganizationsService.doAction$;
    contextOrganization$ = this.contextOrganizationService.organization$;

    constructor(
        private dialogRef: MatDialogRef<
            SelectActiveOrganizationDialogComponent,
            BaseDialogResponseStatus | Organization
        >,
        private fetchOrganizationsService: FetchOrganizationsService,
        private router: Router,
        private contextOrganizationService: ContextOrganizationService,
    ) {}

    ngOnInit(): void {
        this.fetchOrganizationsService.search();
        combineLatest([this.organizations$, this.contextOrganizationService.organization$])
            .pipe(
                first(),
                map(([orgs, activeOrg]) => orgs.find((org) => org.id === activeOrg.id)),
                untilDestroyed(this),
            )
            .subscribe((organization) => (this.selectedOrganization = organization));
    }

    confirm(): void {
        this.dialogRef.close(this.selectedOrganization);
        void this.router.navigate(['/']);
    }

    close(): void {
        this.dialogRef.close(BaseDialogResponseStatus.Cancelled);
    }

    showMore(): void {
        this.fetchOrganizationsService.fetchMore();
    }
}
