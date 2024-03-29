import { InjectionToken } from '@angular/core';

import { environment } from '../environments/environment';

export type Env = typeof environment;

export { environment };

export const ENV = new InjectionToken<Env>('Env');
