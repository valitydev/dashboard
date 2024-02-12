import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatTooltip } from '@angular/material/tooltip';
import { TranslocoModule } from '@ngneat/transloco';
import { FlexModule } from 'ng-flex-layout';

import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';
import { ButtonModule } from '@dsh/components/buttons';
import { BootstrapIconModule } from '@dsh/components/indicators';
import { SelectionModule } from '@dsh/components/indicators/selection';
import { NestedTableModule } from '@dsh/components/nested-table';

import { ChangeRolesTableComponent } from './change-roles-table.component';
import { SelectRoleDialogComponent } from './components/select-role-dialog/select-role-dialog.component';

@NgModule({
    imports: [
        NestedTableModule,
        MatCheckboxModule,
        CommonModule,
        ButtonModule,
        FlexModule,
        BaseDialogModule,
        TranslocoModule,
        MatRadioModule,
        ReactiveFormsModule,
        SelectionModule,
        MatButtonModule,
        MatTableModule,
        BootstrapIconModule,
        FormsModule,
        MatTooltip,
    ],
    declarations: [ChangeRolesTableComponent, SelectRoleDialogComponent],
    exports: [ChangeRolesTableComponent],
})
export class ChangeRolesTableModule {}
