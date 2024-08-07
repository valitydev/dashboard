import { environment } from '../environments';

import { KeycloakService } from './auth/keycloak';
import { ConfigService } from './config';
import { IconsService } from './icons';
import { LanguageService } from './language';
import { ThemeManager } from './theme-manager';

export const initializer =
    (
        configService: ConfigService,
        keycloakService: KeycloakService,
        languageService: LanguageService,
        themeManager: ThemeManager,
        iconsService: IconsService,
    ) =>
    () =>
        Promise.all([
            configService.init({ configUrl: environment.appConfigPath }).then(() =>
                Promise.all([
                    themeManager.init(),
                    keycloakService.init({
                        config: environment.authConfigPath,
                        initOptions: {
                            onLoad: 'login-required',
                            checkLoginIframe: true,
                        },
                        loadUserProfileAtStartUp: true,
                        enableBearerInterceptor: true,
                        bearerExcludedUrls: ['/assets'],
                        bearerPrefix: 'Bearer',
                    }),
                ]),
            ),
            languageService.init(),
            iconsService.init(),
        ]);
