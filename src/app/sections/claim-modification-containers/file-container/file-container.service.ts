import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';
import { TranslocoService } from '@ngneat/transloco';

import { FilesService } from '../../../api/files';
import { FileData } from '../../../api-codegen/dark-api/swagger-codegen';
import { booleanDelay, takeError } from '../../../custom-operators';
import { download } from '../../../../utils';

@Injectable()
export class FileContainerService {
    private getFileInfo$ = new Subject<string>();

    fileInfo$: Observable<FileData> = this.getFileInfo$.pipe(
        switchMap(fileID => this.filesService.getFileInfo(fileID)),
        shareReplay(1)
    );

    isLoading$ = this.fileInfo$.pipe(
        booleanDelay(),
        shareReplay(1)
    );

    error$ = this.fileInfo$.pipe(
        takeError,
        shareReplay(1)
    );

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
        this.filesService
            .downloadFile(fileID)
            .subscribe(
                ({ url }) => download(url),
                () => this.snackBar.open(this.transloco.translate('commonError'), 'OK')
            );
    }
}