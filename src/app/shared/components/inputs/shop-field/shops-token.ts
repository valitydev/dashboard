import { InjectionToken } from '@angular/core';
import { Shop } from '@vality/swag-payments';
import { Observable } from 'rxjs';

export const SHOPS = new InjectionToken<Observable<Shop[]>>('Shops');
