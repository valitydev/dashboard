import { KeycloakService } from './auth/keycloak';
import { ConfigService } from './config';
import { IconsService } from './icons';
import { initSentry } from './init-sentry';
import { LanguageService } from './language';
import { ThemeManager } from './theme-manager';

export const initializer =
    (
        configService: ConfigService,
        keycloakService: KeycloakService,
        languageService: LanguageService,
        themeManager: ThemeManager,
        iconsService: IconsService
    ) =>
    () =>
        Promise.all([
            configService.init({ configUrl: '/appConfig.json' }).then(() =>
                Promise.all([
                    themeManager.init(),
                    initSentry(configService.sentryDsn),
                    keycloakService.init({
                        config: '/authConfig.json',
                        initOptions: {
                            onLoad: 'login-required',
                            checkLoginIframe: true,
                        },
                        loadUserProfileAtStartUp: true,
                        enableBearerInterceptor: true,
                        bearerExcludedUrls: ['/assets', configService.fileStorageEndpoint],
                        bearerPrefix: 'Bearer',
                    }),
                ])
            ),
            languageService.init(),
            iconsService.init(),
        ]);
