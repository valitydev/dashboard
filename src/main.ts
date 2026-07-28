import { enableProdMode, provideZoneChangeDetection } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as Sentry from '@sentry/angular';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();
}

if (SENTRY_DSN) {
    Sentry.init({
        dsn: SENTRY_DSN,
        environment: environment.production ? 'production' : 'development',
        integrations: [
            Sentry.browserTracingIntegration(),
            Sentry.replayIntegration({
                maskAllText: true,
                maskAllInputs: true,
                blockAllMedia: true,
            }),
        ],
        tracesSampleRate: 1,
        replaysSessionSampleRate: 1,
        replaysOnErrorSampleRate: 1,
        enableLogs: true,
    });
}

platformBrowserDynamic()
    .bootstrapModule(AppModule, { applicationProviders: [provideZoneChangeDetection()] })
    .catch((err) => console.error(err));
