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
        /* eslint-disable @typescript-eslint/naming-convention */
        Administrator: this.t.translate('organizations.roleId.Administrator', null, 'dictionary'),
        Accountant: this.t.translate('organizations.roleId.Accountant', null, 'dictionary'),
        Integrator: this.t.translate('organizations.roleId.Integrator', null, 'dictionary'),
        Manager: this.t.translate('organizations.roleId.Manager', null, 'dictionary'),
        WalletManager: this.t.translate('organizations.roleId.WalletManager', null, 'dictionary'),
        /* eslint-enable @typescript-eslint/naming-convention */
    }));
    resourceScopeId$ = this.dictionaryService.create<ResourceScopeId>(() => ({
        /* eslint-disable @typescript-eslint/naming-convention */
        Shop: this.t.translate('organizations.resourceScopeId.Shop', null, 'dictionary'),
        /* eslint-enable @typescript-eslint/naming-convention */
    }));
    resourceScopeIdPlural$ = this.dictionaryService.create<ResourceScopeId>(() => ({
        /* eslint-disable @typescript-eslint/naming-convention */
        Shop: this.t.translate('organizations.resourceScopeIdPlural.Shop', null, 'dictionary'),
        Wallet: this.t.translate('organizations.resourceScopeIdPlural.Wallet', null, 'dictionary'),
        /* eslint-enable @typescript-eslint/naming-convention */
    }));

    constructor(
        private t: TranslocoService,
        private dictionaryService: DictionaryService,
    ) {}
}
