import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { ConfigService } from '../config';
import icons from './icons.json';

@Injectable()
export class IconsService {
    constructor(
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer,
        private configService: ConfigService
    ) {}

    init(): void {
        this.registerIcons(icons);
        this.registerLogoIcon();
    }

    private registerIcons(iconList) {
        for (const name of iconList) {
            this.matIconRegistry.addSvgIcon(
                name,
                this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icons/${name}.svg`)
            );
        }
    }

    private registerLogoIcon() {
        this.configService.isInit$.subscribe({
            complete: () => {
                if (this.configService.theme.logo)
                    this.matIconRegistry.addSvgIconLiteral(
                        'logo',
                        this.domSanitizer.bypassSecurityTrustHtml(this.configService.theme.logo.svg)
                    );
            },
        });
    }
}
