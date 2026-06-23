import { Observable } from 'rxjs';

import { InjectionToken } from '@angular/core';

import { Shop } from '@vality/swag-payments';

export const SHOPS = new InjectionToken<Observable<Shop[]>>('Shops');
