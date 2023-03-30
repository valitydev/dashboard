import {
    MatLegacySnackBarRef as MatSnackBarRef,
    LegacySimpleSnackBar as SimpleSnackBar,
} from '@angular/material/legacy-snack-bar';

import { CommonError } from '@dsh/app/shared';

export interface ErrorResult {
    error: CommonError;
    notification?: MatSnackBarRef<SimpleSnackBar>;
}
