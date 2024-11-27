import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';

import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';
import { FetchOrganizationsService } from '@dsh/app/shared/services/fetch-organizations';
import { ignoreBeforeCompletion } from '@dsh/utils';

import { CreateOrganizationDialogComponent } from './components/create-organization-dialog/create-organization-dialog.component';

@Component({
    selector: 'dsh-organizations',
    templateUrl: 'organizations.component.html',
    styleUrls: ['organizations.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationsComponent implements OnInit {
    organizations$ = this.fetchOrganizationsService.searchResult$;
    hasMore$ = this.fetchOrganizationsService.hasMore$;
    isLoading$ = this.fetchOrganizationsService.doSearchAction$;
    lastUpdated$ = this.fetchOrganizationsService.lastUpdated$;

    constructor(
        private fetchOrganizationsService: FetchOrganizationsService,
        private dialog: MatDialog,
        private dr: DestroyRef,
    ) {}

    ngOnInit() {
        this.fetchOrganizationsService.search();
    }

    @ignoreBeforeCompletion
    createOrganization() {
        return this.dialog
            .open<CreateOrganizationDialogComponent, void, BaseDialogResponseStatus>(
                CreateOrganizationDialogComponent,
            )
            .afterClosed()
            .pipe(
                filter((r) => r === BaseDialogResponseStatus.Success),
                takeUntilDestroyed(this.dr),
            )
            .subscribe(() => this.refresh());
    }

    refresh() {
        this.fetchOrganizationsService.refresh();
    }

    showMore() {
        this.fetchOrganizationsService.fetchMore();
    }
}
