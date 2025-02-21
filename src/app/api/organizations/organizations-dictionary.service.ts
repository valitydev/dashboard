import { Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { ResourceScopeId } from '@vality/swag-organizations';

import { RoleId } from '../../auth/types/role-id';
import { DictionaryService } from '../utils';

export type ResourceScopeIdInternal = ResourceScopeId | 'Wallet';

@Injectable({
    providedIn: 'root',
})
export class OrganizationsDictionaryService {
    roleId$ = this.dictionaryService.create<RoleId>(() => ({
        Administrator: this.t.translate('organizations.roleId.Administrator', null, 'dictionary'),
        Accountant: this.t.translate('organizations.roleId.Accountant', null, 'dictionary'),
        Integrator: this.t.translate('organizations.roleId.Integrator', null, 'dictionary'),
        Manager: this.t.translate('organizations.roleId.Manager', null, 'dictionary'),
        WalletManager: this.t.translate('organizations.roleId.WalletManager', null, 'dictionary'),
    }));
    resourceScopeId$ = this.dictionaryService.create<ResourceScopeId>(() => ({
        Shop: this.t.translate('organizations.resourceScopeId.Shop', null, 'dictionary'),
    }));
    resourceScopeIdPlural$ = this.dictionaryService.create<ResourceScopeId>(() => ({
        Shop: this.t.translate('organizations.resourceScopeIdPlural.Shop', null, 'dictionary'),
        Wallet: this.t.translate('organizations.resourceScopeIdPlural.Wallet', null, 'dictionary'),
    }));

    constructor(
        private t: TranslocoService,
        private dictionaryService: DictionaryService,
    ) {}
}
