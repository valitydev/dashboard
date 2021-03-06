import { TestBed } from '@angular/core/testing';
import { TranslocoService } from '@ngneat/transloco';
import { cold } from 'jasmine-marbles';
import { of, throwError } from 'rxjs';
import { anyNumber, anything, instance, mock, verify, when } from 'ts-mockito';

import { ClaimsService } from '@dsh/api/claim-management';
import { OrgsService } from '@dsh/api/organizations';
import { PartiesService } from '@dsh/api/payments';
import { ApiShopsService } from '@dsh/api/shop';
import { ErrorService } from '@dsh/app/shared';

import { BootstrapService } from './bootstrap.service';

describe('BootstrapService', () => {
    let service: BootstrapService;
    let mockApiShopsService: ApiShopsService;
    let mockClaimsService: ClaimsService;
    let mockCAPIPartiesService: PartiesService;
    let mockErrorService: ErrorService;
    let mockOrganizationsService: OrgsService;
    let mockTranslocoService: TranslocoService;

    beforeEach(() => {
        mockApiShopsService = mock(ApiShopsService);
        mockClaimsService = mock(ClaimsService);
        mockCAPIPartiesService = mock(PartiesService);
        mockErrorService = mock(ErrorService);
        mockOrganizationsService = mock(OrgsService);
        mockTranslocoService = mock(TranslocoService);
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                BootstrapService,
                { provide: ApiShopsService, useFactory: () => instance(mockApiShopsService) },
                { provide: ClaimsService, useFactory: () => instance(mockClaimsService) },
                { provide: PartiesService, useFactory: () => instance(mockCAPIPartiesService) },
                { provide: ErrorService, useFactory: () => instance(mockErrorService) },
                { provide: OrgsService, useFactory: () => instance(mockOrganizationsService) },
                { provide: TranslocoService, useFactory: () => instance(mockTranslocoService) },
            ],
        });
        service = TestBed.inject(BootstrapService);
    });

    beforeEach(() => {
        when(mockCAPIPartiesService.getMyParty()).thenReturn(of('party' as any));
        when(mockClaimsService.createClaim(anything())).thenReturn(of('claim' as any));
        when(mockOrganizationsService.createOrg(anything())).thenReturn(of('org' as any));
        when(mockOrganizationsService.listOrgMembership(anyNumber())).thenReturn(of({ result: ['membership' as any] }));
        when(mockApiShopsService.shops$).thenReturn(of(['shop1' as any]));
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    // TODO fix unstable error
    xdescribe('bootstrap', () => {
        it('should be init party, org and shop', () => {
            service.bootstrap();
            expect(service.bootstrapped$).toBeObservable(cold('(a)', { a: true }));
            verify(mockCAPIPartiesService.getMyParty()).once();
            verify(mockOrganizationsService.createOrg(anything())).never();
            verify(mockClaimsService.createClaim(anything())).never();
        });

        it('should be created org', () => {
            when(mockOrganizationsService.listOrgMembership(anyNumber())).thenReturn(of({ result: [] }));
            service.bootstrap();
            service.bootstrapped$.subscribe().unsubscribe();
            verify(mockOrganizationsService.createOrg(anything())).once();
            expect().nothing();
        });

        it('should be created shop', () => {
            when(mockApiShopsService.shops$).thenReturn(of([]));
            service.bootstrap();
            service.bootstrapped$.subscribe().unsubscribe();
            verify(mockClaimsService.createClaim(anything())).once();
            expect().nothing();
        });

        it('should be return error', () => {
            when(mockCAPIPartiesService.getMyParty()).thenReturn(throwError('error'));
            service.bootstrap();
            service.bootstrapped$.subscribe().unsubscribe();
            verify(mockErrorService.error(anything())).once();
            expect().nothing();
        });
    });
});
