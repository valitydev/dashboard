import { Component, Inject, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import * as Sentry from '@sentry/angular';
import { first, map } from 'rxjs/operators';

import { ENV, Env } from '../environments';
import { BootstrapService } from './bootstrap.service';
import { ContextService } from './shared';

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
        private contextService: ContextService
    ) {}

    ngOnInit(): void {
        this.bootstrapService.bootstrap();
        this.contextService.organization$
            .pipe(map(({ party }) => party))
            .pipe(first(), untilDestroyed(this))
            .subscribe((partyID) => Sentry.setUser({ id: partyID }));
    }
}
