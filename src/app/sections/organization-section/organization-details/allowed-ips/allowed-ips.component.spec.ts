import { BehaviorSubject, Subject, of, throwError } from 'rxjs';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { OrgsService } from '@dsh/app/api/organizations/orgs.service';
import { ErrorService } from '@dsh/app/shared/services/error/error.service';
import { NotificationService } from '@dsh/app/shared/services/notification/notification.service';
import { OrganizationManagementService } from '@dsh/app/shared/services/organization-management/organization-management.service';

import { Organization } from '@vality/swag-organizations';

import { AllowedIpsComponent } from './allowed-ips.component';

describe('Organization IP address editing', () => {
    let fixture: ComponentFixture<AllowedIpsComponent>;
    let component: AllowedIpsComponent;
    let params: BehaviorSubject<ReturnType<typeof convertToParamMap>>;
    let response: Subject<Organization>;
    let getOrg: ReturnType<typeof vi.fn>;
    let patchAllowedIps: ReturnType<typeof vi.fn>;
    let error: ReturnType<typeof vi.fn>;
    let success: ReturnType<typeof vi.fn>;

    function organization(id = 'org-id', addresses = ['192.0.2.1']): Organization {
        return {
            id,
            name: 'Organization',
            owner: 'owner-id',
            createdAt: '',
            allowedIps: new Set(addresses),
        };
    }

    function create(canManage = true) {
        TestBed.configureTestingModule({
            imports: [AllowedIpsComponent],
            providers: [
                { provide: ActivatedRoute, useValue: { parent: { paramMap: params } } },
                { provide: OrgsService, useValue: { getOrg, patchAllowedIps } },
                { provide: ErrorService, useValue: { error } },
                { provide: NotificationService, useValue: { success } },
                {
                    provide: OrganizationManagementService,
                    useValue: { init: vi.fn(), hasAdminAccess$: of(canManage) },
                },
            ],
        }).overrideComponent(AllowedIpsComponent, {
            set: { imports: [], providers: [], template: '' },
        });
        fixture = TestBed.createComponent(AllowedIpsComponent);
        component = fixture.componentInstance;
    }

    function typeAddress(value: string) {
        component.addresses.at(-1).setValue(value);
        component.form.markAsDirty();
    }

    beforeEach(() => {
        params = new BehaviorSubject(convertToParamMap({ orgId: 'org-id' }));
        response = new Subject<Organization>();
        getOrg = vi.fn().mockReturnValue(of(organization()));
        patchAllowedIps = vi.fn().mockReturnValue(response);
        error = vi.fn();
        success = vi.fn();
    });

    it('loads settings for the organization in the parent route', () => {
        create();
        expect(getOrg).toHaveBeenCalledWith({ orgId: 'org-id' });
        expect(component.addresses.getRawValue()).toEqual(['192.0.2.1', '']);
        expect(component.form.pristine).toBe(true);
        expect(component.loading()).toBe(false);
    });

    it('appends one empty field on input and keeps the entered field in place', () => {
        create();
        const draft = component.addresses.at(-1);
        typeAddress('2');
        expect(component.addresses.getRawValue()).toEqual(['192.0.2.1', '2', '']);
        expect(component.addresses.at(1)).toBe(draft);
        draft.setValue('2001:db8::1');
        expect(component.addresses.length).toBe(3);
        expect(component.form.valid).toBe(true);
    });

    it('requires values in existing rows but permits an empty trailing field', () => {
        create();
        typeAddress('   ');
        expect(component.addresses.length).toBe(2);
        expect(component.form.valid).toBe(true);
        typeAddress('2001:db8::1');
        component.addresses.at(1).setValue('');
        expect(component.form.invalid).toBe(true);
        component.save();
        expect(patchAllowedIps).not.toHaveBeenCalled();

        component.addresses.at(1).setValue('   ');
        expect(component.form.invalid).toBe(true);
        component.removeAddress(1);
        expect(component.form.valid).toBe(true);
    });

    it('sends an empty array after the last address is removed', () => {
        create();
        component.removeAddress(0);
        component.save();
        expect(patchAllowedIps).toHaveBeenCalledWith('org-id', []);
        response.next(organization('org-id', []));
        response.complete();
        expect(component.addresses.getRawValue()).toEqual(['']);
        expect(component.form.pristine).toBe(true);
        expect(component.saving()).toBe(false);
    });

    it('trims and deduplicates addresses and blocks repeated submissions', () => {
        create();
        typeAddress(' 192.0.2.1 ');
        typeAddress(' 2001:db8::1 ');
        component.addresses.at(-1).setValue('   ');
        component.save();
        component.save();
        component.removeAddress(0);
        expect(patchAllowedIps).toHaveBeenCalledExactlyOnceWith('org-id', [
            '192.0.2.1',
            '2001:db8::1',
        ]);
        expect(component.addresses.length).toBe(4);

        response.next(organization('org-id', ['192.0.2.1', '2001:db8::1']));
        response.complete();
        expect(component.addresses.getRawValue()).toEqual(['192.0.2.1', '2001:db8::1', '']);
        expect(component.form.pristine).toBe(true);
        expect(success).toHaveBeenCalledOnce();
    });

    it('preserves edits and allows retrying after a failed save', () => {
        create();
        component.removeAddress(0);
        component.save();
        const failure = new Error('Save failed');
        response.error(failure);
        expect(error).toHaveBeenCalledWith(failure);
        expect(component.form.dirty).toBe(true);
        expect(component.addresses.getRawValue()).toEqual(['']);
        expect(component.saving()).toBe(false);
        expect(success).not.toHaveBeenCalled();
    });

    it('prevents editing and saving without administration access', () => {
        create(false);
        component.removeAddress(0);
        component.form.markAsDirty();
        component.save();
        expect(component.addresses.getRawValue()).toEqual(['192.0.2.1', '']);
        expect(patchAllowedIps).not.toHaveBeenCalled();
    });

    it('retries loading after an API error', () => {
        getOrg.mockReturnValueOnce(throwError(() => new Error('Load failed')));
        create();
        expect(component.loadFailed()).toBe(true);
        expect(component.loading()).toBe(false);
        component.refresh();
        expect(component.loadFailed()).toBe(false);
        expect(component.canManage()).toBe(true);
        expect(component.addresses.getRawValue()).toEqual(['192.0.2.1', '']);
    });

    it('does not apply an old save response after navigating to another organization', () => {
        create();
        component.removeAddress(0);
        component.save();
        getOrg.mockReturnValue(of(organization('another-org', ['192.0.2.2'])));
        params.next(convertToParamMap({ orgId: 'another-org' }));
        response.next(organization('org-id', []));
        expect(component.addresses.getRawValue()).toEqual(['192.0.2.2', '']);
        expect(component.saving()).toBe(false);
        expect(success).not.toHaveBeenCalled();
    });
});
