import { Component, OnInit } from '@angular/core';
import * as sentry from '@sentry/angular-ivy';
import { first } from 'rxjs/operators';

import { BootstrapService } from './bootstrap.service';
import { ContextOrganizationService } from './shared';

@Component({
    selector: 'dsh-root',
    templateUrl: 'app.component.html',
    providers: [BootstrapService],
})
export class AppComponent implements OnInit {
    bootstrapped$ = this.bootstrapService.bootstrapped$;

    constructor(
        private bootstrapService: BootstrapService,
        private contextOrganizationService: ContextOrganizationService,
    ) {}

    ngOnInit(): void {
        this.contextOrganizationService.organization$
            .pipe(first())
            .subscribe(({ party }) => sentry.setUser({ id: party }));
    }
}
