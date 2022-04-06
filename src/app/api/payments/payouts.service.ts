import { Injectable } from '@angular/core';
import { PayoutsService as ApiPayoutsService } from '@vality/swag-payments';

import { createApi } from '../utils';

@Injectable()
export class PayoutsService extends createApi(ApiPayoutsService) {}
