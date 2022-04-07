import { NgModule } from '@angular/core';

import { AggrProxyModule } from './aggr-proxy';
import { AnapiModule } from './anapi';
import { DarkApiModule } from './dark-api';

@NgModule({
    imports: [AnapiModule, AggrProxyModule, DarkApiModule],
})
/**
 * @deprecated there are intersections of services
 */
export class ApiCodegenModule {}
