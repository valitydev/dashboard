import { Component, ViewChild, TemplateRef } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { DialogSuperclass, DEFAULT_DIALOG_CONFIG } from '@vality/ng-core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { OrganizationsDictionaryService } from '@dsh/app/api/organizations';
import { RoleAccess, ROLE_ACCESS_GROUPS } from '@dsh/app/auth';
import { RoleId } from '@dsh/app/auth/types/role-id';
import { ROLE_PRIORITY_DESC } from '@dsh/app/shared/components/organization-roles/utils/sort-role-ids';
import { NestedTableColumn, NestedTableNode } from '@dsh/components/nested-table';

import { RoleAccessesDictionaryService } from './services/role-accesses-dictionary.service';

interface FlatRoleAccess extends RoleAccess {
    isHeader: boolean;
}

@Component({
    selector: 'dsh-select-role-dialog',
    templateUrl: 'select-role-dialog.component.html',
    styleUrls: ['select-role-dialog.component.scss'],
})
export class SelectRoleDialogComponent extends DialogSuperclass<
    SelectRoleDialogComponent,
    { availableRoles: RoleId[]; isShow?: boolean },
    { selectedRoleId: RoleId }
> {
    static defaultDialogConfig = DEFAULT_DIALOG_CONFIG.large;

    roleControl = this.fb.control<RoleId>(null, Validators.required);
    accesses: FlatRoleAccess[] = ROLE_ACCESS_GROUPS.map((r) => ({ ...r, isHeader: true })).flatMap(
        (r) => [r, ...(r.children || [])] as FlatRoleAccess[],
    );
    roleIdDict$ = this.organizationsDictionaryService.roleId$;
    roleAccessDict$ = this.roleAccessesDictionaryService.roleAccessDict$;
    columns$: Observable<NestedTableColumn<FlatRoleAccess>[]> = combineLatest([
        this.roleIdDict$,
        this.roleAccessDict$,
    ]).pipe(
        map(([roleIdDict, roleAccessDict]) => [
            {
                field: 'name',
                header: '',
                formatter: (d) => (d ? roleAccessDict[d.name] : ''),
            },
            ...this.roles.map((r) => ({ field: r, header: roleIdDict[r] })),
        ]),
    );
    data: NestedTableNode<FlatRoleAccess>[] = [
        { value: null },
        ...this.accesses.map((a) => ({ value: a })),
    ];

    @ViewChild('accessCellTpl') accessCellTpl: TemplateRef<unknown>;

    get cellsTemplates() {
        return Object.fromEntries(this.roles.map((r) => [r, this.accessCellTpl]));
    }

    get roles() {
        return (this.dialogData?.availableRoles || []).sort(
            (a, b) => ROLE_PRIORITY_DESC[a] - ROLE_PRIORITY_DESC[b],
        );
    }

    constructor(
        private fb: FormBuilder,
        private organizationsDictionaryService: OrganizationsDictionaryService,
        private roleAccessesDictionaryService: RoleAccessesDictionaryService,
    ) {
        super();
    }

    cancel() {
        this.closeWithError();
    }

    select() {
        this.closeWithSuccess({ selectedRoleId: this.roleControl.value });
    }
}
