import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ApiKeysService } from '@dsh/api/api-keys';
import { ErrorService, NotificationService } from '@dsh/app/shared/services';

@UntilDestroy()
@Component({
    selector: 'dsh-api-key-revoke',
    templateUrl: './api-key-revoke.component.html',
})
export class ApiKeyRevokeComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private apiKeysService: ApiKeysService,
        private router: Router,
        private notificationService: NotificationService,
        private errorService: ErrorService,
        private translocoService: TranslocoService
    ) {}

    ngOnInit(): void {
        const { apiKeyRevokeToken, apiKeyId } = this.route.snapshot.params as Record<string, string>;
        this.apiKeysService
            .revokeApiKey({ apiKeyRevokeToken, apiKeyId })
            .pipe(untilDestroyed(this))
            .subscribe({
                next: () => {
                    this.notificationService.success(
                        this.translocoService.selectTranslate('apiKeys.revoke.success', null, 'payment-section')
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
