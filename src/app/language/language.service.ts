import { registerLocaleData } from '@angular/common';
import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import * as moment from 'moment';

import { ANGULAR_LOCALE_DATA } from './angular-locale-data';
import { LANGUAGES, Language } from './languages';
import { SettingsService } from '../settings';

@Injectable({ providedIn: 'root' })
export class LanguageService {
    active: Language;

    private static readonly key = 'language';

    constructor(
        private settingsService: SettingsService,
        private transloco: TranslocoService,
    ) {}

    async init() {
        // TODO: Use after language change support starts
        // const storageLang = this.settingsService.getLocalStorageItem(LanguageService.key);
        const storageLang = null;
        let language: Language;
        if (Array.from<string>(LANGUAGES).includes(storageLang)) {
            language = storageLang as Language;
        } else {
            const browserLang: string =
                navigator.language ||
                (navigator as never as Record<PropertyKey, string>).userLanguage;
            language = Array.from<string>(LANGUAGES).includes(browserLang)
                ? (browserLang as Language)
                : this.active || 'en';
        }
        await this.set(language);
    }

    // TODO: Make it public after language change support starts
    private async set(language: Language) {
        this.active = language;
        registerLocaleData(ANGULAR_LOCALE_DATA[language], language);
        if (language !== 'en') await import(`moment/locale/${language}`);
        moment.locale(language);
        this.settingsService.setLocalStorageItem(LanguageService.key, language);
        this.transloco.setActiveLang(language);
    }
}
