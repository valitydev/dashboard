import { Component, ViewChild, TemplateRef, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DialogSuperclass, DEFAULT_DIALOG_CONFIG } from '@vality/ng-core';
import { combineLatest, Observable, ReplaySubject } from 'rxjs';
import { map, first } from 'rxjs/operators';

import { OrganizationsDictionaryService } from '@dsh/app/api/organizations';
import { ROLE_ACCESS_GROUPS, RoleAccessGroup } from '@dsh/app/auth';
import { RoleId } from '@dsh/app/auth/types/role-id';
import { ROLE_PRIORITY_DESC } from '@dsh/app/shared/components/organization-roles/utils/sort-role-ids';
import { NestedTableColumn, NestedTableNode } from '@dsh/components/nested-table';

import { RoleAccessesDictionaryService } from './services/role-accesses-dictionary.service';

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

    selectedRole$ = new ReplaySubject<RoleId>(1);
    roleIdDict$ = this.organizationsDictionaryService.roleId$;
    roleAccessDict$ = this.roleAccessesDictionaryService.roleAccessDict$;
    columns$: Observable<NestedTableColumn<RoleAccessGroup>[]> = combineLatest([
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
    data: NestedTableNode<RoleAccessGroup>[] = [
        { value: null },
        ...ROLE_ACCESS_GROUPS.map((g) => ({
            value: g,
            children: g.children?.map?.((a) => ({ value: a })),
            expanded: true,
        })),
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
        private destroyRef: DestroyRef,
        private organizationsDictionaryService: OrganizationsDictionaryService,
        private roleAccessesDictionaryService: RoleAccessesDictionaryService,
    ) {
        super();
    }

    cancel() {
        this.closeWithError();
    }

    select() {
        this.selectedRole$
            .pipe(first(), takeUntilDestroyed(this.destroyRef))
            .subscribe((selectedRoleId) => {
                this.closeWithSuccess({ selectedRoleId });
            });
    }
}
