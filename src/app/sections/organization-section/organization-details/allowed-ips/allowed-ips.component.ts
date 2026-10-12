import { FlexLayoutModule } from 'ng-flex-layout';
import {
    BehaviorSubject,
    EMPTY,
    Subject,
    catchError,
    combineLatest,
    distinctUntilChanged,
    finalize,
    map,
    switchMap,
    take,
    takeUntil,
} from 'rxjs';

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { OrgsService } from '@dsh/app/api/organizations/orgs.service';
import { ErrorService } from '@dsh/app/shared/services/error/error.service';
import { NotificationService } from '@dsh/app/shared/services/notification/notification.service';
import { OrganizationManagementService } from '@dsh/app/shared/services/organization-management/organization-management.service';
import { SpinnerModule } from '@dsh/components/indicators/spinner';
import { TextColorModule } from '@dsh/components/indicators/text-color';
import { CardModule } from '@dsh/components/layout/card';
import { TranslocoModule } from '@jsverse/transloco';

import { Organization } from '@vality/swag-organizations';

@Component({
    selector: 'dsh-allowed-ips',
    templateUrl: 'allowed-ips.component.html',
    styleUrl: 'allowed-ips.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatDividerModule,
        MatFormFieldModule,
        MatInputModule,
        TranslocoModule,
        CardModule,
        SpinnerModule,
        TextColorModule,
    ],
    providers: [OrganizationManagementService],
})
export class AllowedIpsComponent {
    private readonly route = inject(ActivatedRoute);
    private readonly organizationsService = inject(OrgsService);
    private readonly organizationManagementService = inject(OrganizationManagementService);
    private readonly notificationService = inject(NotificationService);
    private readonly errorService = inject(ErrorService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly refresh$ = new BehaviorSubject<void>(undefined);
    private readonly organizationChanged$ = new Subject<void>();
    private readonly organization = signal<Organization | null>(null);

    readonly form = new FormGroup({ addresses: new FormArray<FormControl<string>>([]) });
    readonly addresses = this.form.controls.addresses;
    readonly loading = signal(true);
    readonly loadFailed = signal(false);
    readonly saving = signal(false);
    readonly canManage = signal(false);

    constructor() {
        combineLatest([
            this.route.parent.paramMap.pipe(
                map((params) => params.get('orgId')),
                distinctUntilChanged(),
            ),
            this.refresh$,
        ])
            .pipe(
                switchMap(([orgId]) => {
                    this.organizationChanged$.next();
                    this.loading.set(true);
                    this.loadFailed.set(false);
                    this.canManage.set(false);
                    return this.organizationsService.getOrg({ orgId }).pipe(
                        switchMap((organization) => {
                            this.organization.set(organization);
                            this.setAddresses(organization);
                            this.organizationManagementService.init(organization);
                            return this.organizationManagementService.hasAdminAccess$.pipe(take(1));
                        }),
                        catchError((error) => {
                            this.loadFailed.set(true);
                            this.errorService.error(error);
                            return EMPTY;
                        }),
                        finalize(() => this.loading.set(false)),
                    );
                }),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe((allowed) => this.canManage.set(allowed));

        this.addresses.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
            const draft = this.addresses.at(-1);
            if (!draft?.value.trim()) return;
            draft.setValidators([Validators.required, Validators.pattern(/\S/)]);
            draft.updateValueAndValidity({ emitEvent: false });
            this.addresses.push(new FormControl('', { nonNullable: true }), { emitEvent: false });
        });
    }

    refresh() {
        this.refresh$.next();
    }

    removeAddress(index: number) {
        if (!this.canManage() || this.saving() || index === this.addresses.length - 1) return;
        this.addresses.removeAt(index);
        this.form.markAsDirty();
    }

    save() {
        const organization = this.organization();
        if (!organization || !this.canManage() || this.loading() || this.saving()) return;
        if (this.form.invalid || this.form.pristine) return;

        const allowedIps = [
            ...new Set(
                this.addresses
                    .getRawValue()
                    .slice(0, -1)
                    .map((ip) => ip.trim()),
            ),
        ];
        this.saving.set(true);
        this.organizationsService
            .patchAllowedIps(organization.id, allowedIps)
            .pipe(
                takeUntil(this.organizationChanged$),
                takeUntilDestroyed(this.destroyRef),
                finalize(() => this.saving.set(false)),
            )
            .subscribe({
                next: (updated) => {
                    this.organization.set(updated);
                    this.setAddresses(updated);
                    this.notificationService.success();
                },
                error: (error) => this.errorService.error(error),
            });
    }

    private createAddress(value: string) {
        return new FormControl(value, {
            nonNullable: true,
            validators: [Validators.required, Validators.pattern(/\S/)],
        });
    }

    private setAddresses(organization: Organization) {
        this.addresses.clear({ emitEvent: false });
        for (const address of Array.from(organization.allowedIps ?? [])) {
            this.addresses.push(this.createAddress(address), { emitEvent: false });
        }
        this.addresses.push(new FormControl('', { nonNullable: true }), { emitEvent: false });
        this.form.markAsPristine();
        this.form.markAsUntouched();
    }
}
