import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Configuration } from '@vality/swag-organizations';

import { OrgsService } from './orgs.service';

describe('Organization allowed IP requests', () => {
    let service: OrgsService;
    let http: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                { provide: Configuration, useValue: new Configuration({ basePath: '/org/v1' }) },
            ],
        });
        service = TestBed.inject(OrgsService);
        http = TestBed.inject(HttpTestingController);
    });

    afterEach(() => http.verify());

    it('sends an array of addresses without replacing other organization fields', () => {
        service.patchAllowedIps('org-id', ['192.0.2.1', '2001:db8::1']).subscribe();

        const request = http.expectOne('/org/v1/orgs/org-id');
        expect(request.request.method).toBe('PATCH');
        expect(request.request.headers.has('X-Request-ID')).toBe(true);
        expect(request.request.serializeBody()).toBe(
            JSON.stringify({ allowedIps: ['192.0.2.1', '2001:db8::1'] }),
        );
        request.flush({});
    });

    it('preserves an explicitly empty address list', () => {
        service.patchAllowedIps('org-id', []).subscribe();

        const request = http.expectOne('/org/v1/orgs/org-id');
        expect(request.request.serializeBody()).toBe(JSON.stringify({ allowedIps: [] }));
        request.flush({});
    });
});
