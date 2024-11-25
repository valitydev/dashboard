import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { APP_INITIALIZER, LOCALE_ID, NgModule, isDevMode } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
    DateAdapter,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE,
    MAT_RIPPLE_GLOBAL_OPTIONS,
} from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import {
    MAT_MOMENT_DATE_ADAPTER_OPTIONS,
    MAT_MOMENT_DATE_FORMATS,
    MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslocoModule, provideTransloco, TRANSLOCO_SCOPE } from '@jsverse/transloco';
import { QUERY_PARAMS_SERIALIZERS } from '@vality/ng-core';
import { FlexLayoutModule } from 'ng-flex-layout';

import { AnapiModule } from '@dsh/app/api/anapi';
import { ClaimManagementModule } from '@dsh/app/api/claim-management';
import { PaymentsModule } from '@dsh/app/api/payments';
import { UrlShortenerModule } from '@dsh/app/api/url-shortener';
import { WalletModule } from '@dsh/app/api/wallet';
import { ErrorModule } from '@dsh/app/shared/services';
import { createDateRangeWithPresetSerializer } from '@dsh/components/date-range-filter';
import { SpinnerModule, BootstrapIconModule } from '@dsh/components/indicators';

import { ENV, environment } from '../environments';

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
import { ThemeManager } from './theme-manager';
import { TranslocoHttpLoaderService } from './transloco-http-loader.service';

@NgModule({
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        SectionsModule,
        AuthModule,
        HomeModule,
        KeycloakAngularModule,
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
        WalletModule,
        SpinnerModule,
        ApiKeysModule,
        MatButtonModule,
        BootstrapIconModule,
        MatMenuModule,
    ],
    providers: [
        LanguageService,
        {
            provide: APP_INITIALIZER,
            useFactory: initializer,
            deps: [ConfigService, KeycloakService, LanguageService, ThemeManager, IconsService],
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
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
        },
        { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: { disabled: true } },
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
        provideTransloco({
            config: {
                availableLangs: ['en', 'ru'],
                defaultLang: 'en',
                fallbackLang: 'ru',
                reRenderOnLangChange: true,
                prodMode: !isDevMode(),
            },
            loader: TranslocoHttpLoaderService,
        }),
        { provide: ENV, useValue: environment },
        {
            provide: QUERY_PARAMS_SERIALIZERS,
            useValue: [createDateRangeWithPresetSerializer()],
        },
        { provide: TRANSLOCO_SCOPE, useValue: 'app' },
        provideHttpClient(withInterceptorsFromDi()),
    ],
})
export class AppModule {}
