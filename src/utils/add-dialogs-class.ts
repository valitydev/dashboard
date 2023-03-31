import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

export function addDialogsClass(dialogs: MatDialogRef<any>[], className: string) {
    dialogs.forEach((d) => d.addPanelClass(className));
    return () => dialogs.forEach((d) => d.removePanelClass(className));
}
