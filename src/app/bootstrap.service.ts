import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ShopsDataService } from '@dsh/app/shared';

@Injectable()
export class BootstrapService {
    bootstrapped$: Observable<boolean> = this.shopsDataService.shops$.pipe(map(() => true));

    constructor(private shopsDataService: ShopsDataService) {}
}
