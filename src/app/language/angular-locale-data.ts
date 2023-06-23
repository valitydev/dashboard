import localeEn from '@angular/common/locales/en';
import localeRu from '@angular/common/locales/ru';

import { Language } from './languages';

export const ANGULAR_LOCALE_DATA: { [language in Language]: unknown } = {
    ru: localeRu,
    en: localeEn,
};
