import { Injectable } from '@angular/core';
import {
    MatLegacySnackBar as MatSnackBar,
    MatLegacySnackBarConfig as MatSnackBarConfig,
    MatLegacySnackBarRef as MatSnackBarRef,
    LegacySimpleSnackBar as SimpleSnackBar,
} from '@angular/material/legacy-snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, first, isObservable, timeout } from 'rxjs';

const DEFAULT_DURATION_MS = 3000;

@Injectable()
export class NotificationService {
    constructor(private snackBar: MatSnackBar, private transloco: TranslocoService) {}

    success(
        message: string | Observable<string> = this.transloco.translate('notification.success', null, 'services')
    ): MatSnackBarRef<SimpleSnackBar> {
        return this.openSnackBar(message);
    }

    error(
        message: string | Observable<string> = this.transloco.translate('notification.error', null, 'services')
    ): MatSnackBarRef<SimpleSnackBar> {
        return this.openSnackBar(message);
    }

    private openSnackBar(
        message: string | Observable<string>,
        config: MatSnackBarConfig<unknown> = {}
    ): MatSnackBarRef<SimpleSnackBar> {
        const okMessage = this.transloco.translate('notification.ok', null, 'services');
        const resConfig = {
            duration: DEFAULT_DURATION_MS,
            ...config,
        };
        if (isObservable(message)) {
            message.pipe(first(), timeout(5000)).subscribe((m) => {
                this.snackBar.open(m, okMessage, resConfig);
            });
            return;
        }
        return this.snackBar.open(message, okMessage, resConfig);
    }
}
