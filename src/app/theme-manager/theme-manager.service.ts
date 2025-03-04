import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

import { ConfigService } from '../config';

import { ThemeName } from './types/theme-name';
import { createStyleElement } from './utils/create-style-element';
import { isTheme } from './utils/is-theme';

const THEME_POSTFIX = 'theme';

@Injectable({ providedIn: 'root' })
export class ThemeManager {
    current: ThemeName;

    private element: HTMLScriptElement | HTMLLinkElement;

    constructor(
        @Inject(DOCUMENT) private doc: Document,
        private configService: ConfigService,
    ) {}

    change(name: ThemeName): void {
        this.removeCurrent();
        this.set(name);
    }

    async init(): Promise<void> {
        const theme = this.configService?.theme;
        const correctedName = this.getCorrectName(theme.name);
        this.change(correctedName);
    }

    private getCorrectName(theme: string): ThemeName {
        if (isTheme(theme)) {
            return theme;
        }
        console.error(`Unknown theme: ${theme}`);
        return ThemeName.Main;
    }

    private set(name: ThemeName) {
        this.element = createStyleElement(`${name}-${THEME_POSTFIX}.css`);
        this.doc.head.appendChild(this.element);
        this.doc.body.classList.add(name);
        this.current = name;
    }

    private removeCurrent() {
        if (this.doc.head.contains(this.element)) {
            this.doc.head.removeChild(this.element);
        }
        this.doc.body.classList.remove(this.current);
    }
}
