import { MatDialogRef } from '@angular/material/dialog';

export function addDialogsClass(dialogs: MatDialogRef<unknown>[], className: string) {
    dialogs.forEach((d) => d.addPanelClass(className));
    return () => dialogs.forEach((d) => d.removePanelClass(className));
}
