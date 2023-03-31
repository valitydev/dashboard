import { TestBed } from '@angular/core/testing';
import { instance, mock } from 'ts-mockito';

import { IconsService } from './icons.service';
import { ConfigService } from '../config';
import { ThemeManager } from '../theme-manager';

describe('IconsService', () => {
    let service: IconsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                IconsService,
                { provide: ThemeManager, useValue: instance(mock(ThemeManager)) },
                { provide: ConfigService, useValue: instance(mock(ConfigService)) },
            ],
        });

        service = TestBed.inject(IconsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
