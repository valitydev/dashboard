import { NgModule } from '@angular/core';

import { CapiConfigService } from './capi-config.service';
import { InvoicesService } from './invoices.service';
import {
    ApiModule,
    ClaimsService,
    Configuration,
    CountriesService,
    PartiesService,
    PayoutsService,
} from './swagger-codegen';

@NgModule({
    imports: [
        {
            ngModule: ApiModule,
            providers: [{ provide: Configuration, useClass: CapiConfigService }],
        },
    ],
    providers: [CapiConfigService, ClaimsService, InvoicesService, PayoutsService, PartiesService, CountriesService],
})
export class CapiModule {}
