import { NgModule } from '@angular/core';

import { AnapiModule } from './anapi';

@NgModule({
    imports: [AnapiModule],
})
/**
 * @deprecated there are intersections of services
 */
export class ApiCodegenModule {}
