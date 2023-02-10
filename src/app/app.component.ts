import { Component, Inject, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import * as Sentry from '@sentry/angular';
import { first, map } from 'rxjs/operators';

import { ENV, Env } from '../environments';
import { BootstrapService } from './bootstrap.service';
import { ContextOrganizationService } from './shared';

@UntilDestroy()
@Component({
    selector: 'dsh-root',
    templateUrl: 'app.component.html',
    providers: [BootstrapService],
})
export class AppComponent implements OnInit {
    bootstrapped$ = this.bootstrapService.bootstrapped$;

    constructor(
        private bootstrapService: BootstrapService,
        @Inject(ENV) public env: Env,
        private contextOrganizationService: ContextOrganizationService
    ) {}

    ngOnInit(): void {
        this.bootstrapService.bootstrap();
        this.contextOrganizationService.organization$
            .pipe(map(({ party }) => party))
            .pipe(first(), untilDestroyed(this))
            .subscribe((partyID) => Sentry.setUser({ id: partyID }));
    }
}
