import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DialogSuperclass, DEFAULT_DIALOG_CONFIG, progressTo } from '@vality/ng-core';
import { MemberRole } from '@vality/swag-organizations';
import { BehaviorSubject, defer, forkJoin, of, Subscription } from 'rxjs';
import { catchError, shareReplay, switchMap, map } from 'rxjs/operators';

import { MembersService } from '@dsh/app/api/organizations';
import { ErrorService } from '@dsh/app/shared';

import { EditRolesDialogData } from './types/edit-roles-dialog-data';

@Component({
    selector: 'dsh-edit-roles-dialog',
    templateUrl: 'edit-roles-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class EditRolesDialogComponent extends DialogSuperclass<
    EditRolesDialogData,
    EditRolesDialogData
> {
    static defaultDialogConfig = DEFAULT_DIALOG_CONFIG.large;

    roles$ = defer(() => this.updateRoles$).pipe(
        switchMap(() =>
            this.membersService
                .getOrgMember({
                    orgId: this.dialogData.organization.id,
                    userId: this.dialogData.userId,
                })
                .pipe(map((r) => r.roles)),
        ),
        takeUntilDestroyed(this.dr),
        shareReplay(1),
    );
    progress$ = new BehaviorSubject(0);

    private updateRoles$ = new BehaviorSubject<void>(null);

    constructor(
        private membersService: MembersService,
        private errorService: ErrorService,
        private dr: DestroyRef,
    ) {
        super();
    }

    cancel(): void {
        this.closeWithCancellation();
    }

    addRoles(roles: MemberRole[]): Subscription {
        return forkJoin(
            roles.map((memberRole) =>
                this.membersService.assignMemberRole({
                    orgId: this.dialogData.organization.id,
                    userId: this.dialogData.userId,
                    memberRole,
                }),
            ),
        )
            .pipe(
                progressTo(this.progress$),
                catchError((err) => {
                    this.errorService.error(err);
                    return of(undefined);
                }),
            )
            .subscribe(() => this.updateRoles$.next());
    }

    removeRoles(roles: MemberRole[]): Subscription {
        return forkJoin(
            roles.map((role) =>
                this.membersService
                    .removeMemberRole({
                        orgId: this.dialogData.organization.id,
                        userId: this.dialogData.userId,
                        memberRoleId: role.id,
                    })
                    .pipe(
                        progressTo(this.progress$),
                        catchError((err) => {
                            this.errorService.error(err);
                            return of(undefined);
                        }),
                    ),
            ),
        ).subscribe(() => this.updateRoles$.next());
    }
}
