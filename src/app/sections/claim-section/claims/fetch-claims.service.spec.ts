import { TestBed } from '@angular/core/testing';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { TranslocoTestingModule } from '@ngneat/transloco';

import { FetchClaimsService } from './services/fetch-claims/fetch-claims.service';
import * as ru from '../../../../assets/i18n/ru.json';
import { ClaimsService } from '../../../api/claims';

class MockApiClaimsService {}

const TRANSLATION_CONFIG = {
    ru,
};

describe('FetchClaimsService', () => {
    let service: FetchClaimsService;
    let apiClaimsService: MockApiClaimsService;

    beforeEach(() => {
        apiClaimsService = new MockApiClaimsService();
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MatSnackBarModule,
                TranslocoTestingModule.withLangs(TRANSLATION_CONFIG, {
                    availableLangs: ['ru'],
                    defaultLang: 'ru',
                }),
            ],
            providers: [
                FetchClaimsService,
                {
                    provide: ClaimsService,
                    useValue: apiClaimsService,
                },
            ],
        });
    });

    beforeEach(() => {
        service = TestBed.inject(FetchClaimsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
