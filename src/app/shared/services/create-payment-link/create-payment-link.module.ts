import { NgModule } from '@angular/core';

import { UrlShortenerModule } from '@dsh/api';

import { CreatePaymentLinkService } from './create-payment-link.service';

@NgModule({
    imports: [UrlShortenerModule],
    providers: [CreatePaymentLinkService],
})
export class CreatePaymentLinkModule {}
