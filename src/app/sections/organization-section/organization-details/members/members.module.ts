import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { OrganizationsModule as OrganizationsAPIModule } from '@dsh/app/api/organizations';
import { ErrorModule, NotificationModule } from '@dsh/app/shared';
import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';
import { EmptyModule } from '@dsh/components/empty';
import { EmptySearchResultModule } from '@dsh/components/empty-search-result';
import { IndicatorsModule, SpinnerModule } from '@dsh/components/indicators';
import { AccordionModule, DetailsItemModule, LayoutModule } from '@dsh/components/layout';
import { ScrollUpModule } from '@dsh/components/navigation';
import { NavigationLinkModule } from '@dsh/components/navigation-link';
import { ShowMorePanelModule } from '@dsh/components/show-more-panel';

import { OrganizationRolesModule } from '../../../../shared/components/organization-roles';
import { ChangeRolesTableModule } from '../change-roles-table';

import { EditRolesDialogComponent } from './components/edit-roles-dialog/edit-roles-dialog.component';
import { MemberComponent } from './components/member/member.component';
import { MembersListComponent } from './components/members-list/members-list.component';
import { MembersRoutingModule } from './members-routing.module';
import { MembersComponent } from './members.component';

@NgModule({
    imports: [
        MembersRoutingModule,
        CommonModule,
        TranslocoModule,
        FlexLayoutModule,
        LayoutModule,
        ScrollUpModule,
        ShowMorePanelModule,
        EmptySearchResultModule,
        SpinnerModule,
        MatButtonModule,
        AccordionModule,
        OrganizationsAPIModule,
        MatDividerModule,
        DetailsItemModule,
        NavigationLinkModule,
        IndicatorsModule,
        MatSnackBarModule,
        MatDialogModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        NotificationModule,
        ErrorModule,
        MatInputModule,
        OrganizationRolesModule,
        BaseDialogModule,
        ChangeRolesTableModule,
        EmptyModule,
    ],
    declarations: [
        MembersComponent,
        MembersListComponent,
        MemberComponent,
        EditRolesDialogComponent,
    ],
    exports: [MembersComponent, MemberComponent],
})
export class MembersModule {}
