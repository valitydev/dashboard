import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { TranslocoModule } from '@ngneat/transloco';

import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';
import { ButtonModule } from '@dsh/components/buttons';
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
    ],
    declarations: [ChangeRolesTableComponent, SelectRoleDialogComponent],
    exports: [ChangeRolesTableComponent],
})
export class ChangeRolesTableModule {}
