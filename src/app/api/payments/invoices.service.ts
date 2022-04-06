import { Injectable } from '@angular/core';
import { InvoicesService as ApiInvoicesService } from '@vality/swag-payments';

import { createApi } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class InvoicesService extends createApi(ApiInvoicesService) {}
