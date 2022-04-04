import { NgModule } from '@angular/core';

import { AggrProxyModule } from './aggr-proxy';
import { AnapiModule } from './anapi';
import { CapiModule } from './capi';
import { DarkApiModule } from './dark-api';
import { MessagesModule } from './messages';
import { OrganizationsModule } from './organizations';

@NgModule({
    imports: [CapiModule, AnapiModule, AggrProxyModule, DarkApiModule, MessagesModule, OrganizationsModule],
})
/**
 * @deprecated there are intersections of services
 */
export class ApiCodegenModule {}
