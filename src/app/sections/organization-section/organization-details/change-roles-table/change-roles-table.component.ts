import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    OnChanges,
    booleanAttribute,
    ViewChild,
    TemplateRef,
    signal,
    computed,
    Injector,
    DestroyRef,
} from '@angular/core';
import { toObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import {
    ComponentChanges,
    getEnumValues,
    DialogService,
    DialogResponseStatus,
} from '@vality/ng-core';
import { ResourceScopeId, Organization } from '@vality/swag-organizations';
import { Shop } from '@vality/swag-payments';
import { uniqBy } from 'lodash-es';
import isNil from 'lodash-es/isNil';
import { BehaviorSubject, combineLatest, Observable, of, ReplaySubject, filter, defer } from 'rxjs';
import { first, map, switchMap, tap, shareReplay } from 'rxjs/operators';

import {
    OrganizationsDictionaryService,
    MemberRoleOptionalId,
    ResourceScopeIdInternal,
} from '@dsh/app/api/organizations';
import { ShopsService, toLiveShops } from '@dsh/app/api/payments';
import { RoleId } from '@dsh/app/auth/types/role-id';
import { sortRoleIds } from '@dsh/app/shared/components/organization-roles/utils/sort-role-ids';
import { NestedTableColumn, NestedTableNode } from '@dsh/components/nested-table';
import { addDialogsClass } from '@dsh/utils/add-dialogs-class';

import { equalRoles } from '../members/components/edit-roles-dialog/utils/equal-roles';

import { SelectRoleDialogComponent } from './components/select-role-dialog/select-role-dialog.component';

type DataItem = { shop?: Pick<Shop, 'id' | 'details'>; scope?: ResourceScopeIdInternal };

@Component({
    selector: 'dsh-change-roles-table',
    templateUrl: 'change-roles-table.component.html',
    styleUrls: ['change-roles-table.component.scss'],
    standalone: false,
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
    @Input({ transform: booleanAttribute }) hasAtLeastOneRole: boolean;
    @Input({ transform: booleanAttribute }) controlled: boolean;
    @Input() inProgress = false;

    @Output() selectedRoles = new EventEmitter<MemberRoleOptionalId[]>();
    @Output() addedRoles = new EventEmitter<MemberRoleOptionalId[]>();
    @Output() removedRoles = new EventEmitter<MemberRoleOptionalId[]>();

    @ViewChild('roleCellTpl') cellTemplate: TemplateRef<unknown>;
    @ViewChild('footerCellTpl') footerTemplate: TemplateRef<unknown>;

    organization$ = new ReplaySubject<Organization>(1);
    roleIds = signal<Set<RoleId>>(new Set());
    shops$ = this.organization$.pipe(
        switchMap((organization) =>
            this.shopsService.getShopsForParty({ partyID: organization.party }),
        ),
        map((shops) => toLiveShops(shops)),
        shareReplay({ bufferSize: 1, refCount: true }),
    );
    availableRoles = computed(() => Object.values(RoleId).filter((r) => !this.roleIds().has(r)));
    roles$ = new BehaviorSubject<MemberRoleOptionalId[]>([]);
    columns$ = combineLatest([
        toObservable(this.roleIds),
        this.organizationsDictionaryService.roleId$,
        defer(() => toObservable(this.isAllowAdd, { injector: this.injector })),
        this.organizationsDictionaryService.resourceScopeIdPlural$,
    ]).pipe(
        map(([roleIds, rolesDict, isAllowAdd, scopesDict]): NestedTableColumn<DataItem>[] => [
            {
                field: 'name',
                header: '',
                formatter: (d) => (d.scope ? scopesDict[d.scope] : d.shop.details.name),
                style: { 'min-width': '130px' },
            },
            ...Array.from(roleIds).map((r) => ({
                field: r,
                header: rolesDict?.[r] || r,
                style: { 'text-align': 'center' },
            })),
            ...(isAllowAdd
                ? [
                      {
                          field: 'add',
                          header: '',
                      },
                  ]
                : []),
        ]),
    );
    data$: Observable<NestedTableNode<DataItem>[]> = combineLatest([this.shops$, this.roles$]).pipe(
        map(([shops, roles]) => [
            {
                value: { scope: ResourceScopeId.Shop },
                children: [
                    ...shops,
                    ...roles
                        .filter((r) => r.scope?.id === ResourceScopeId.Shop)
                        .map((r) => r.scope.resourceId)
                        .filter((id) => !!id && shops.every((s) => s.id !== id))
                        .map((id) => ({ id, details: { name: `${id}` } })),
                ].map((shop) => ({ value: { shop } })),
                expanded: true,
            },
            {
                value: { scope: 'Wallet' },
            },
        ]),
    );

    get cellsTemplates() {
        return Object.fromEntries(getEnumValues(RoleId).map((r) => [r, this.cellTemplate]));
    }

    get footerTemplates() {
        return Object.fromEntries(getEnumValues(RoleId).map((r) => [r, this.footerTemplate]));
    }

    private isAllowAdd = computed(
        () =>
            !!this.availableRoles().length &&
            !this.roles.some((r) => r.id === RoleId.Administrator),
    );

    constructor(
        private shopsService: ShopsService,
        private dialog: MatDialog,
        private dialogService: DialogService,
        private organizationsDictionaryService: OrganizationsDictionaryService,
        private injector: Injector,
        private destroyRef: DestroyRef,
    ) {}

    ngOnChanges({ organization }: ComponentChanges<ChangeRolesTableComponent>) {
        if (organization) {
            this.organization$.next(organization.currentValue);
        }
    }

    ngOnInit(): void {
        this.roles$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((roles) => this.selectedRoles.emit(roles));
    }

    add(): void {
        const removeDialogsClass = addDialogsClass(this.dialog.openDialogs, 'dsh-hidden');
        this.dialogService
            .open(SelectRoleDialogComponent, { availableRoles: this.availableRoles() })
            .afterClosed()
            .pipe(
                tap(() => removeDialogsClass()),
                filter((result) => result.status === DialogResponseStatus.Success),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe(({ data: { selectedRoleId } }) => {
                this.addRoleIds([selectedRoleId]);
                if (
                    selectedRoleId === RoleId.Administrator ||
                    selectedRoleId === RoleId.WalletManager
                ) {
                    this.addRoles([{ roleId: selectedRoleId }]);
                }
            });
    }

    show(roleId?: RoleId) {
        const removeDialogsClass = addDialogsClass(this.dialog.openDialogs, 'dsh-hidden');
        this.dialogService
            .open(SelectRoleDialogComponent, {
                availableRoles: roleId ? [roleId] : getEnumValues(RoleId),
                isShow: true,
            })
            .afterClosed()
            .pipe(takeUntilDestroyed(this.destroyRef))
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
            return;
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

    disabled(
        roleId: RoleId,
        resourceId?: string,
        scopeId?: ResourceScopeIdInternal,
    ): Observable<boolean> {
        if ([RoleId.Administrator, RoleId.WalletManager].includes(roleId) || scopeId === 'Wallet') {
            return of(true);
        }
        if (!this.hasAtLeastOneRole) {
            return of(false);
        }
        return combineLatest([this.roles$, this.checked(roleId, resourceId)]).pipe(
            map(
                ([roles, isChecked]) =>
                    isChecked &&
                    (roles.length <= 1 ||
                        (!resourceId && uniqBy(roles, (r) => r.roleId).length <= 1)),
            ),
        );
    }

    checked(
        roleId: RoleId,
        resourceId?: string,
        scopeId?: ResourceScopeIdInternal,
    ): Observable<boolean> {
        if (scopeId === 'Wallet') {
            return of(roleId === RoleId.WalletManager);
        }
        if (roleId === RoleId.Administrator) {
            return of(true);
        }
        return combineLatest([
            resourceId
                ? of([resourceId])
                : this.shops$.pipe(map((shops) => shops.map(({ id }) => id))),
            this.roles$,
        ]).pipe(
            map(([shopIds, roles]) =>
                shopIds.every((resourceId) =>
                    roles.find((r) =>
                        equalRoles(r, { roleId, scope: { id: ResourceScopeId.Shop, resourceId } }),
                    ),
                ),
            ),
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

    isAllowRemove(roleId: RoleId) {
        return this.roles$.pipe(
            map((roles) => !this.hasAtLeastOneRole || roles.some((r) => r.roleId !== roleId)),
        );
    }

    private toggleAll(roleId: RoleId): void {
        const roles = this.roles.filter((r) => r.roleId === roleId);
        combineLatest([this.shops$, this.checked(roleId)])
            .pipe(first(), takeUntilDestroyed(this.destroyRef))
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

    private addRoleIds(roleIds: RoleId[]) {
        const newRoleIds = new Set(roleIds.sort(sortRoleIds));
        if (Array.from(newRoleIds).every((r) => this.roleIds().has(r))) {
            return;
        }
        this.roleIds.update((v) => (newRoleIds.forEach((r) => v.add(r)), new Set(v)));
    }

    private removeRoleIds(roleIds: RoleId[]) {
        this.roleIds.update((v) => (roleIds.forEach((r) => v.delete(r)), new Set(v)));
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
