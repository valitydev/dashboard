import { Injectable } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar, MatLegacySnackBarConfig as MatSnackBarConfig, MatLegacySnackBarRef as MatSnackBarRef, LegacySimpleSnackBar as SimpleSnackBar } from '@angular/material/legacy-snack-bar';
import { TranslocoService } from '@ngneat/transloco';

const DEFAULT_DURATION_MS = 3000;

@Injectable()
export class NotificationService {
    constructor(private snackBar: MatSnackBar, private transloco: TranslocoService) {}

    success(
        message: string = this.transloco.translate('notification.success', null, 'services')
    ): MatSnackBarRef<SimpleSnackBar> {
        return this.openSnackBar(message);
    }

    error(
        message: string = this.transloco.translate('notification.error', null, 'services')
    ): MatSnackBarRef<SimpleSnackBar> {
        return this.openSnackBar(message);
    }

    private openSnackBar(message: string, config: MatSnackBarConfig<unknown> = {}): MatSnackBarRef<SimpleSnackBar> {
        return this.snackBar.open(message, this.transloco.translate('notification.ok', null, 'services'), {
            duration: DEFAULT_DURATION_MS,
            ...config,
        });
    }
}
