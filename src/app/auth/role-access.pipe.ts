import { AsyncPipe } from '@angular/common';
import { Pipe, PipeTransform, ChangeDetectorRef, OnDestroy } from '@angular/core';

import { RoleAccessService } from './role-access.service';
import { RoleAccessName } from './types/role-access-name';

@Pipe({
    name: 'isAccessAllowed',
})
export class IsAccessAllowedPipe implements PipeTransform, OnDestroy {
    private asyncPipe: AsyncPipe;

    constructor(private roleAccessService: RoleAccessService, ref: ChangeDetectorRef) {
        this.asyncPipe = new AsyncPipe(ref);
    }

    ngOnDestroy() {
        this.asyncPipe.ngOnDestroy();
    }

    transform(roleAccessNames: RoleAccessName[], type: 'every' | 'some' = 'every'): boolean {
        return this.asyncPipe.transform(this.roleAccessService.isAccessAllowed(roleAccessNames, type));
    }
}
