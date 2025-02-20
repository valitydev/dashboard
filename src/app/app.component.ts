import { Component, isDevMode } from '@angular/core';

import { Language, LanguageService } from '@dsh/app/language';

import { BootstrapService } from './bootstrap.service';

@Component({
    selector: 'dsh-root',
    templateUrl: 'app.component.html',
    providers: [BootstrapService],
    standalone: false,
})
export class AppComponent {
    bootstrapped$ = this.bootstrapService.bootstrapped$;
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
