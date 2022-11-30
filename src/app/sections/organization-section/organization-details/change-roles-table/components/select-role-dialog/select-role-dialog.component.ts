import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@ngneat/reactive-forms';
import { RoleId } from '@vality/swag-organizations';

import { OrganizationsDictionaryService } from '@dsh/api/organizations';
import { RoleAccess, ROLE_ACCESS_GROUPS } from '@dsh/app/auth';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';
import { ROLE_PRIORITY_DESC } from '@dsh/app/shared/components/organization-roles/utils/sort-role-ids';

import { RoleAccessesDictionaryService } from './services/role-accesses-dictionary.service';
import { SelectRoleDialogResult } from './types/select-role-dialog-result';
import { SelectRoleDialogData } from './types/selected-role-dialog-data';

interface FlatRoleAccess extends RoleAccess {
    isHeader: boolean;
}

@Component({
    selector: 'dsh-select-role-dialog',
    templateUrl: 'select-role-dialog.component.html',
    styleUrls: ['select-role-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectRoleDialogComponent {
    roleControl = this.fb.control<RoleId>(null, Validators.required);
    accesses: FlatRoleAccess[] = ROLE_ACCESS_GROUPS.map((r) => ({ ...r, isHeader: true })).flatMap(
        (r) => [r, ...(r.children || [])] as FlatRoleAccess[]
    );
    roleIdDict$ = this.organizationsDictionaryService.roleId$;
    roleAccessDict$ = this.roleAccessesDictionaryService.roleAccessDict$;
    get rowsGridTemplateColumns() {
        return `2fr ${'1fr '.repeat(this.data.availableRoles.length)}`;
    }
    get roles() {
        return this.data.availableRoles.sort((a, b) => ROLE_PRIORITY_DESC[a] - ROLE_PRIORITY_DESC[b]);
    }

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: SelectRoleDialogData,
        private dialogRef: MatDialogRef<SelectRoleDialogComponent, SelectRoleDialogResult>,
        private fb: FormBuilder,
        private organizationsDictionaryService: OrganizationsDictionaryService,
        private roleAccessesDictionaryService: RoleAccessesDictionaryService
    ) {}

    cancel() {
        this.dialogRef.close(BaseDialogResponseStatus.Error);
    }

    select() {
        this.dialogRef.close({
            selectedRoleId: this.roleControl.value,
        });
    }
}
