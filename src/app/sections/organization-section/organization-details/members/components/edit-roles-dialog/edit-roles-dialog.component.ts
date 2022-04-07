import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntilDestroy } from '@ngneat/until-destroy';
import { BehaviorSubject, defer, forkJoin, of, Subscription } from 'rxjs';
import { catchError, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { MemberRole } from '@dsh/api-codegen/organizations';
import { MembersService } from '@dsh/api/organizations';
import { ErrorService } from '@dsh/app/shared';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';

import { EditRolesDialogData } from './types/edit-roles-dialog-data';

@UntilDestroy()
@Component({
    selector: 'dsh-edit-roles-dialog',
    templateUrl: 'edit-roles-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditRolesDialogComponent {
    roles$ = defer(() => this.updateRoles$).pipe(
        switchMap(() =>
            this.membersService.getOrgMember({ orgId: this.data.orgId, userId: this.data.userId }).pipe(pluck('roles'))
        ),
        shareReplay(1)
    );

    private updateRoles$ = new BehaviorSubject<void>(null);

    constructor(
        private dialogRef: MatDialogRef<EditRolesDialogComponent, BaseDialogResponseStatus>,
        @Inject(MAT_DIALOG_DATA) private data: EditRolesDialogData,
        private membersService: MembersService,
        private errorService: ErrorService
    ) {}

    cancel(): void {
        this.dialogRef.close(BaseDialogResponseStatus.Cancelled);
    }

    addRoles(roles: MemberRole[]): Subscription {
        return forkJoin(
            roles.map((memberRole) =>
                this.membersService.assignMemberRole({ orgId: this.data.orgId, userId: this.data.userId, memberRole })
            )
        )
            .pipe(
                catchError((err) => {
                    this.errorService.error(err);
                    return of(undefined);
                })
            )
            .subscribe(() => this.updateRoles$.next());
    }

    removeRoles(roles: MemberRole[]): Subscription {
        return forkJoin(
            roles.map((role) =>
                this.membersService.removeMemberRole({
                    orgId: this.data.orgId,
                    userId: this.data.userId,
                    memberRoleId: role.id,
                })
            )
        )
            .pipe(
                catchError((err) => {
                    this.errorService.error(err);
                    return of(undefined);
                })
            )
            .subscribe(() => this.updateRoles$.next());
    }
}
