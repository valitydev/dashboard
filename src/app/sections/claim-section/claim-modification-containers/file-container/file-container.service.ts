import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { FileData } from '@vality/swag-dark-api';
import { Observable, Subject } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';

import { FilesService } from '@dsh/api/dark-api';
import { takeError } from '@dsh/operators';
import { download } from '@dsh/utils';

@Injectable()
export class FileContainerService {
    private getFileInfo$ = new Subject<string>();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    fileInfo$: Observable<FileData> = this.getFileInfo$.pipe(
        switchMap((fileID) => this.filesService.getFileInfo({ fileID })),
        shareReplay(1)
    );

    // eslint-disable-next-line @typescript-eslint/member-ordering
    isLoading$ = this.fileInfo$.pipe(shareReplay(1));

    // eslint-disable-next-line @typescript-eslint/member-ordering
    error$ = this.fileInfo$.pipe(takeError, shareReplay(1));

    constructor(
        private filesService: FilesService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        this.fileInfo$.subscribe();
    }

    getFileInfo(fileID: string) {
        this.getFileInfo$.next(fileID);
    }

    downloadFile(fileID: string) {
        this.filesService.downloadFile({ fileID }).subscribe(
            ({ url }) => download(url),
            () => this.snackBar.open(this.transloco.translate('commonError'), 'OK')
        );
    }
}
