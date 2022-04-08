import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MAT_MOMENT_DATE_ADAPTER_OPTIONS,
    MAT_MOMENT_DATE_FORMATS,
    MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { TRANSLOCO_CONFIG, TRANSLOCO_LOADER, TranslocoConfig, TranslocoModule } from '@ngneat/transloco';
import * as Sentry from '@sentry/angular';

import { AnapiModule } from '@dsh/api/anapi';
import { ClaimManagementModule } from '@dsh/api/claim-management';
import { MessagesModule } from '@dsh/api/messages';
import { PaymentsModule } from '@dsh/api/payments';
import { QuestionaryAggrProxyModule } from '@dsh/api/questionary-aggr-proxy';
import { UrlShortenerModule } from '@dsh/api/url-shortener';
import { ErrorModule, KeycloakTokenInfoModule } from '@dsh/app/shared/services';
import { QUERY_PARAMS_SERIALIZERS } from '@dsh/app/shared/services/query-params/utils/query-params-serializers';
import { createDateRangeWithPresetSerializer } from '@dsh/components/date-range-filter';

import { ENV, environment } from '../environments';
import { ApiCodegenModule } from './api-codegen';
import { OrganizationsModule } from './api/organizations';
import { AppComponent } from './app.component';
import { AuthModule, KeycloakAngularModule, KeycloakService } from './auth';
import { ConfigModule, ConfigService } from './config';
import { HomeModule } from './home';
import { IconsModule, IconsService } from './icons';
import { initializer } from './initializer';
import { LanguageService } from './language';
import { SectionsModule } from './sections';
import { SentryErrorHandler } from './sentry-error-handler.service';
import { SentryHttpInterceptor } from './sentry-http-interceptor';
import { SettingsModule } from './settings';
import { ThemeManager, ThemeManagerModule } from './theme-manager';
import { TranslocoHttpLoaderService } from './transloco-http-loader.service';

@NgModule({
    declarations: [AppComponent],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        SectionsModule,
        ApiCodegenModule,
        AuthModule,
        ThemeManagerModule,
        ConfigModule,
        HomeModule,
        SettingsModule,
        KeycloakAngularModule,
        HttpClientModule,
        TranslocoModule,
        ErrorModule,
        IconsModule,
        KeycloakTokenInfoModule,
        FlexLayoutModule,
        MatDialogModule,
        ClaimManagementModule,
        AnapiModule,
        PaymentsModule,
        MessagesModule,
        OrganizationsModule,
        UrlShortenerModule,
        QuestionaryAggrProxyModule,
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
            useValue: {
                reRenderOnLangChange: false,
                defaultLang: 'ru',
                availableLangs: ['ru'],
                fallbackLang: 'ru',
                prodMode: environment.production,
            } as TranslocoConfig,
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
