import { Injectable } from '@angular/core';
import { InvoiceTemplatesService as ApiInvoiceTemplatesService } from '@vality/swag-payments';

import { createApi } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class InvoiceTemplatesService extends createApi(ApiInvoiceTemplatesService) {}
