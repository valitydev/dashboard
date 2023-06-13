import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MAT_LEGACY_FORM_FIELD_DEFAULT_OPTIONS as MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/legacy-form-field';
import {
    MAT_MOMENT_DATE_ADAPTER_OPTIONS,
    MAT_MOMENT_DATE_FORMATS,
    MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { TRANSLOCO_CONFIG, TRANSLOCO_LOADER, TranslocoModule, translocoConfig } from '@ngneat/transloco';
import * as Sentry from '@sentry/angular';

import { AnapiModule } from '@dsh/app/api/anapi';
import { ClaimManagementModule } from '@dsh/app/api/claim-management';
import { PaymentsModule } from '@dsh/app/api/payments';
import { QuestionaryAggrProxyModule } from '@dsh/app/api/questionary-aggr-proxy';
import { UrlShortenerModule } from '@dsh/app/api/url-shortener';
import { WalletModule } from '@dsh/app/api/wallet';
import { ErrorModule } from '@dsh/app/shared/services';
import { QUERY_PARAMS_SERIALIZERS } from '@dsh/app/shared/services/query-params/utils/query-params-serializers';
import { createDateRangeWithPresetSerializer } from '@dsh/components/date-range-filter';
import { SpinnerModule } from '@dsh/components/indicators';

import { ApiKeysModule } from './api/api-keys';
import { OrganizationsModule } from './api/organizations';
import { AppComponent } from './app.component';
import { AuthModule, KeycloakAngularModule, KeycloakService } from './auth';
import { ConfigService } from './config';
import { HomeModule } from './home';
import { IconsModule, IconsService } from './icons';
import { initializer } from './initializer';
import { LanguageService } from './language';
import { SectionsModule } from './sections';
import { SentryErrorHandler } from './sentry-error-handler.service';
import { SentryHttpInterceptor } from './sentry-http-interceptor';
import { ThemeManager } from './theme-manager';
import { TranslocoHttpLoaderService } from './transloco-http-loader.service';
import { ENV, environment } from '../environments';

@NgModule({
    declarations: [AppComponent],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        SectionsModule,
        AuthModule,
        HomeModule,
        KeycloakAngularModule,
        HttpClientModule,
        TranslocoModule,
        ErrorModule,
        IconsModule,
        FlexLayoutModule,
        MatDialogModule,
        ClaimManagementModule,
        AnapiModule,
        PaymentsModule,
        OrganizationsModule,
        UrlShortenerModule,
        QuestionaryAggrProxyModule,
        WalletModule,
        SpinnerModule,
        ApiKeysModule,
    ],
    providers: [
        LanguageService,
        {
            provide: APP_INITIALIZER,
            useFactory: initializer,
            deps: [ConfigService, KeycloakService, LanguageService, ThemeManager, IconsService, Sentry.TraceService],
            multi: true,
        },
        {
            provide: LOCALE_ID,
            deps: [LanguageService],
            useFactory: (languageService: LanguageService) => languageService.active,
        },
        {
            provide: MAT_DATE_LOCALE,
            deps: [LanguageService],
            useFactory: (languageService: LanguageService) => languageService.active,
        },
        { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: false } },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
        { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: { disabled: true } },
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
        {
            provide: TRANSLOCO_CONFIG,
            useValue: translocoConfig({
                availableLangs: ['en', 'ru'],
                defaultLang: 'en',
                fallbackLang: 'ru',
                reRenderOnLangChange: true,
                prodMode: environment.production,
            }),
        },
        { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoaderService },
        { provide: ENV, useValue: environment },
        {
            provide: ErrorHandler,
            useClass: SentryErrorHandler,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: SentryHttpInterceptor,
            multi: true,
        },
        {
            provide: Sentry.TraceService,
            deps: [Router],
        },
        {
            provide: QUERY_PARAMS_SERIALIZERS,
            useValue: [createDateRangeWithPresetSerializer()],
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
