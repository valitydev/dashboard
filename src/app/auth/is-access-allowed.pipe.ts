import { AsyncPipe } from '@angular/common';
import { Pipe, PipeTransform, ChangeDetectorRef, OnDestroy } from '@angular/core';

import { RoleAccessService } from './role-access.service';
import { RoleAccessName } from './types/role-access-name';

@Pipe({
    name: 'isAccessAllowed',
    pure: false,
    standalone: false,
})
export class IsAccessAllowedPipe implements PipeTransform, OnDestroy {
    private asyncPipe: AsyncPipe;

    constructor(
        private roleAccessService: RoleAccessService,
        ref: ChangeDetectorRef,
    ) {
        this.asyncPipe = new AsyncPipe(ref);
    }

    ngOnDestroy() {
        this.asyncPipe.ngOnDestroy();
    }

    transform(
        roleAccessNames: RoleAccessName[] | keyof typeof RoleAccessName,
        type: 'every' | 'some' = 'some',
    ): boolean {
        return this.asyncPipe.transform(
            this.roleAccessService.isAccessAllowed(
                Array.isArray(roleAccessNames)
                    ? roleAccessNames
                    : [RoleAccessName[roleAccessNames]],
                type,
            ),
        );
    }
}
