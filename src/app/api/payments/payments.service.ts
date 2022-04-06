import { Injectable } from '@angular/core';
import { PaymentsService as ApiPaymentsService } from '@vality/swag-payments';

import { createApi } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class PaymentsService extends createApi(ApiPaymentsService) {}
