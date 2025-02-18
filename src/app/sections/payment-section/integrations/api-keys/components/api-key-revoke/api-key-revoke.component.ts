import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';

import { ApiKeysService } from '@dsh/app/api/api-keys';
import { ErrorService, NotificationService } from '@dsh/app/shared/services';

@Component({
    selector: 'dsh-api-key-revoke',
    templateUrl: './api-key-revoke.component.html',
    standalone: false,
})
export class ApiKeyRevokeComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private apiKeysService: ApiKeysService,
        private router: Router,
        private notificationService: NotificationService,
        private errorService: ErrorService,
        private translocoService: TranslocoService,
        private dr: DestroyRef,
    ) {}

    ngOnInit(): void {
        const { apiKeyRevokeToken, apiKeyId } = this.route.snapshot.params as Record<
            string,
            string
        >;
        this.apiKeysService
            .revokeApiKey({ apiKeyRevokeToken, apiKeyId })
            .pipe(takeUntilDestroyed(this.dr))
            .subscribe({
                next: () => {
                    this.notificationService.success(
                        this.translocoService.selectTranslate(
                            'apiKeys.revoke.success',
                            null,
                            'payment-section',
                        ),
                    );
                    void this.router.navigate(['../../..'], { relativeTo: this.route });
                },
                error: (err) => {
                    this.errorService.error(err);
                    void this.router.navigate(['../../..'], { relativeTo: this.route });
                },
            });
    }
}
