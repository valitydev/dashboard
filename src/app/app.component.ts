import { Component, OnInit, isDevMode } from '@angular/core';
import * as sentry from '@sentry/angular-ivy';
import { first } from 'rxjs/operators';

import { LanguageService, Language } from '@dsh/app/language';

import { BootstrapService } from './bootstrap.service';
import { ContextOrganizationService } from './shared';

@Component({
    selector: 'dsh-root',
    templateUrl: 'app.component.html',
    providers: [BootstrapService],
})
export class AppComponent implements OnInit {
    bootstrapped$ = this.bootstrapService.bootstrapped$;
    isDev = isDevMode();

    get languages() {
        return this.languageService.list.filter((l) => l !== this.languageService.active);
    }

    constructor(
        private bootstrapService: BootstrapService,
        private contextOrganizationService: ContextOrganizationService,
        public languageService: LanguageService,
    ) {}

    ngOnInit(): void {
        this.contextOrganizationService.organization$
            .pipe(first())
            .subscribe(({ party }) => sentry.setUser({ id: party }));
    }

    async setLanguage(language: Language) {
        await this.languageService.set(language);
        window.location.reload();
    }
}
