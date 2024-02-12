import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    OnChanges,
    booleanAttribute,
    ViewChild,
    TemplateRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ComponentChanges, getEnumValues, DialogService } from '@vality/ng-core';
import { ResourceScopeId, Organization } from '@vality/swag-organizations';
import { Shop } from '@vality/swag-payments';
import isNil from 'lodash-es/isNil';
import { BehaviorSubject, combineLatest, EMPTY, Observable, of, ReplaySubject } from 'rxjs';
import { first, map, switchMap, tap, shareReplay } from 'rxjs/operators';

import { OrganizationsDictionaryService, MemberRoleOptionalId } from '@dsh/app/api/organizations';
import { ShopsService } from '@dsh/app/api/payments';
import { RoleId } from '@dsh/app/auth/types/role-id';
import { sortRoleIds } from '@dsh/app/shared/components/organization-roles/utils/sort-role-ids';
import { NestedTableColumn, NestedTableNode } from '@dsh/components/nested-table';
import { addDialogsClass } from '@dsh/utils/add-dialogs-class';

import { equalRoles } from '../members/components/edit-roles-dialog/utils/equal-roles';

import { SelectRoleDialogComponent } from './components/select-role-dialog/select-role-dialog.component';

@UntilDestroy()
@Component({
    selector: 'dsh-change-roles-table',
    templateUrl: 'change-roles-table.component.html',
    styleUrls: ['change-roles-table.component.scss'],
})
export class ChangeRolesTableComponent implements OnInit, OnChanges {
    @Input() set roles(roles: MemberRoleOptionalId[]) {
        if (!isNil(roles)) {
            this.addRoleIds(roles.map(({ roleId }) => roleId as RoleId));
            this.roles$.next(roles);
        }
    }
    get roles(): MemberRoleOptionalId[] {
        return this.roles$.value;
    }
    @Input() organization: Organization;

    /**
     * Edit mode:
     * - there must be at least one role
     */
    @Input({ transform: booleanAttribute }) editMode: boolean;
    @Input({ transform: booleanAttribute }) controlled: boolean;

    @Output() selectedRoles = new EventEmitter<MemberRoleOptionalId[]>();
    @Output() addedRoles = new EventEmitter<MemberRoleOptionalId[]>();
    @Output() removedRoles = new EventEmitter<MemberRoleOptionalId[]>();

    @ViewChild('roleCellTpl') cellTemplate: TemplateRef<unknown>;
    @ViewChild('footerCellTpl') footerTemplate: TemplateRef<unknown>;

    organization$ = new ReplaySubject<Organization>(1);
    roleIds: RoleId[] = [];
    shops$ = this.organization$.pipe(
        switchMap((organization) =>
            this.shopsService.getShopsForParty({ partyID: organization.party }),
        ),
        shareReplay({ bufferSize: 1, refCount: true }),
    );

    get availableRoles(): RoleId[] {
        return Object.values(RoleId).filter((r) => !this.roleIds.includes(r));
    }

    get isAllowAdd(): boolean {
        return !!this.availableRoles.length && !this.hasAdminRole;
    }

    roles$ = new BehaviorSubject<MemberRoleOptionalId[]>([]);

    isAllowRemoves$ = this.roles$.pipe(
        map(
            (roles) =>
                !this.editMode || roles.some((r) => roles.some((b) => b.roleId !== r.roleId)),
        ),
    );
    columns$: Observable<NestedTableColumn<Shop>[]> = combineLatest([
        this.roles$,
        this.organizationsDictionaryService.roleId$,
    ]).pipe(
        map(([, dict]) => [
            {
                field: 'name',
                header: '',
                formatter: (d) => (d ? d.details.name : 'Shops'),
                style: { 'min-width': '130px' },
            },
            ...this.roleIds.map((r) => ({
                field: r,
                header: dict?.[r] || r,
                style: { 'text-align': 'center' },
            })),
            ...(this.isAllowAdd
                ? [
                      {
                          field: 'add',
                          header: '',
                      },
                  ]
                : []),
        ]),
    );
    data$: Observable<NestedTableNode<Shop>[]> = this.shops$.pipe(
        map((shops) => [
            {
                value: null,
                children: shops.map((s) => ({ value: s })),
                expanded: true,
            },
        ]),
    );

    get cellsTemplates() {
        return Object.fromEntries(getEnumValues(RoleId).map((r) => [r, this.cellTemplate]));
    }

    get footerTemplates() {
        return Object.fromEntries(getEnumValues(RoleId).map((r) => [r, this.footerTemplate]));
    }

    private get hasAdminRole() {
        return !!this.roles.find((r) => r.id === RoleId.Administrator);
    }

    constructor(
        private shopsService: ShopsService,
        private dialog: MatDialog,
        private dialogService: DialogService,
        private cdr: ChangeDetectorRef,
        private organizationsDictionaryService: OrganizationsDictionaryService,
    ) {}

    ngOnChanges({ organization }: ComponentChanges<ChangeRolesTableComponent>) {
        if (organization) {
            this.organization$.next(organization.currentValue);
        }
    }

    ngOnInit(): void {
        this.roles$.pipe(untilDestroyed(this)).subscribe((roles) => this.selectedRoles.emit(roles));
    }

    add(): void {
        const removeDialogsClass = addDialogsClass(this.dialog.openDialogs, 'dsh-hidden');
        this.dialogService
            .open(SelectRoleDialogComponent, { availableRoles: this.availableRoles })
            .afterClosed()
            .pipe(
                tap(() => removeDialogsClass()),
                switchMap((result) =>
                    typeof result.data === 'object' ? of(result.data.selectedRoleId) : EMPTY,
                ),
                untilDestroyed(this),
            )
            .subscribe((roleId) => {
                this.addRoleIds([roleId]);
                if (roleId === RoleId.Administrator) {
                    this.addRoles([{ roleId: RoleId.Administrator }]);
                }
                this.cdr.detectChanges();
            });
    }

    show(roleId: RoleId) {
        const removeDialogsClass = addDialogsClass(this.dialog.openDialogs, 'dsh-hidden');
        this.dialogService
            .open(SelectRoleDialogComponent, { availableRoles: [roleId], isShow: true })
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe({
                complete: () => {
                    removeDialogsClass();
                },
            });
    }

    remove(roleId: RoleId): void {
        this.removeRoleIds([roleId]);
        this.removeRoles(this.roles.filter((r) => r.roleId === roleId));
    }

    toggle(roleId: RoleId, resourceId?: string): void {
        if (!resourceId) {
            this.toggleAll(roleId);
        }
        const role: MemberRoleOptionalId = {
            roleId,
            scope: { id: ResourceScopeId.Shop, resourceId },
        };
        const foundRole = this.roles.find((r) => equalRoles(r, role));
        if (foundRole) {
            this.removeRoles([foundRole]);
        } else {
            this.addRoles([role]);
        }
    }

    toggleAll(roleId: RoleId): void {
        const roles = this.roles.filter((r) => r.roleId === roleId);
        combineLatest([this.shops$, this.checkedAll(roleId)])
            .pipe(first(), untilDestroyed(this))
            .subscribe(([shops, isCheckedAll]) => {
                if (isCheckedAll) {
                    this.removeRoles(roles);
                } else {
                    const newRoles = shops
                        .filter((s) => !roles.find((r) => r.scope?.resourceId === s.id))
                        .map(({ id: resourceId }) => ({
                            roleId,
                            scope: { id: ResourceScopeId.Shop, resourceId },
                        }));
                    this.addRoles(newRoles);
                }
            });
    }

    disabled(roleId: RoleId, resourceId?: string): Observable<boolean> {
        if (roleId === RoleId.Administrator) {
            return of(true);
        }
        if (!this.editMode) {
            return of(false);
        }
        return combineLatest([this.roles$, this.checked(roleId, resourceId)]).pipe(
            map(([roles, isChecked]) => roles.length <= 1 && isChecked),
        );
    }

    checked(roleId: RoleId, resourceId?: string): Observable<boolean> {
        if (!resourceId) {
            return this.checkedAll(roleId);
        }
        return this.roles$.pipe(
            map(
                (roles) =>
                    roleId === RoleId.Administrator ||
                    !!roles.find((r) =>
                        equalRoles(r, { roleId, scope: { id: ResourceScopeId.Shop, resourceId } }),
                    ),
            ),
        );
    }

    checkedAll(roleId: RoleId): Observable<boolean> {
        return combineLatest([this.shops$, this.roles$]).pipe(
            map(([shops, roles]) => {
                const shopIds = shops.map(({ id }) => id);
                return (
                    roleId === RoleId.Administrator ||
                    shops.length <=
                        roles.filter(
                            (r) => r.roleId === roleId && shopIds.includes(r.scope?.resourceId),
                        ).length
                );
            }),
        );
    }

    isIntermediate(roleId: RoleId): Observable<boolean> {
        return combineLatest([this.shops$, this.roles$]).pipe(
            map(([shops, roles]) => {
                if (roleId === RoleId.Administrator) {
                    return false;
                }
                const shopIds = shops.map(({ id }) => id);
                const rolesCount = roles.filter(
                    (r) => r.roleId === roleId && shopIds.includes(r.scope?.resourceId),
                ).length;
                return rolesCount > 0 && rolesCount < shops.length;
            }),
        );
    }

    private addRoleIds(roleIds: RoleId[]) {
        this.roleIds = Array.from(new Set([...this.roleIds, ...roleIds])).sort(sortRoleIds);
    }

    private removeRoleIds(roleIds: RoleId[]) {
        this.roleIds = this.roleIds.filter((r) => !roleIds.includes(r));
    }

    private addRoles(roles: MemberRoleOptionalId[]) {
        if (roles.length) {
            if (!this.controlled) {
                this.roles = [...this.roles, ...roles];
            }
            this.addedRoles.emit(roles);
        }
    }

    private removeRoles(roles: MemberRoleOptionalId[]) {
        if (roles.length) {
            if (!this.controlled) {
                this.roles = this.roles.filter((r) => !roles.includes(r));
            }
            this.removedRoles.emit(roles);
        }
    }
}
