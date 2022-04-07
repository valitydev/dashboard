import { NgModule } from '@angular/core';

import { AggrProxyModule } from './aggr-proxy';
import { AnapiModule } from './anapi';
import { DarkApiModule } from './dark-api';
import { OrganizationsModule } from './organizations';

@NgModule({
    imports: [AnapiModule, AggrProxyModule, DarkApiModule, OrganizationsModule],
})
/**
 * @deprecated there are intersections of services
 */
export class ApiCodegenModule {}
