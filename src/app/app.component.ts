import { Component, inject, isDevMode } from '@angular/core';
import { map } from 'rxjs';

import { Language, LanguageService } from '@dsh/app/language';

import { BootstrapService } from './bootstrap.service';
import { ContextOrganizationService } from './shared';

@Component({
    selector: 'dsh-root',
    templateUrl: 'app.component.html',
    providers: [BootstrapService],
    standalone: false,
})
export class AppComponent {
    private contextOrganizationService = inject(ContextOrganizationService);

    bootstrapped$ = this.bootstrapService.bootstrapped$;
    noOrganization$ = this.contextOrganizationService.organization$.pipe(
        map((org) => org === null),
    );
    isDev = isDevMode();

    get languages() {
        return this.languageService.list.filter((l) => l !== this.languageService.active);
    }

    constructor(
        private bootstrapService: BootstrapService,
        public languageService: LanguageService,
    ) {}

    async setLanguage(language: Language) {
        await this.languageService.set(language);
        window.location.reload();
    }
}
