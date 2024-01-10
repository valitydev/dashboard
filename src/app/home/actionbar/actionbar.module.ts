import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { ClaimsService } from '@dsh/app/api/claim-management';
import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';
import { FetchOrganizationsModule } from '@dsh/app/shared/services/fetch-organizations';
import { ButtonModule } from '@dsh/components/buttons';
import { IndicatorsModule } from '@dsh/components/indicators';
import { DropdownModule } from '@dsh/components/layout';
import { LimitedPanelComponent } from '@dsh/components/layout/limited-panel/limited-panel.component';

import { ActionbarComponent } from './actionbar.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { OrganizationsListComponent } from './components/organizations-list/organizations-list.component';
import { SelectActiveOrganizationDialogComponent } from './components/select-active-organization-dialog/select-active-organization-dialog.component';
import { UserComponent } from './components/user';
import { UserDropdownComponent } from './components/user-dropdown/user-dropdown.component';

@NgModule({
    imports: [
        FlexLayoutModule,
        DropdownModule,
        OverlayModule,
        ButtonModule,
        IndicatorsModule,
        MatMenuModule,
        RouterModule,
        CommonModule,
        TranslocoModule,
        MatDividerModule,
        FetchOrganizationsModule,
        MatRadioModule,
        FormsModule,
        BaseDialogModule,
        LimitedPanelComponent,
    ],
    declarations: [
        ActionbarComponent,
        UserComponent,
        MenuItemComponent,
        OrganizationsListComponent,
        SelectActiveOrganizationDialogComponent,
        UserDropdownComponent,
    ],
    providers: [ClaimsService],
    exports: [ActionbarComponent],
})
export class ActionbarModule {}
