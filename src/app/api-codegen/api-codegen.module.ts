import { NgModule } from '@angular/core';

import { AnapiModule } from './anapi';
import { DarkApiModule } from './dark-api';

@NgModule({
    imports: [AnapiModule, DarkApiModule],
})
/**
 * @deprecated there are intersections of services
 */
export class ApiCodegenModule {}
