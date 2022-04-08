import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { FilesService as ApiFilesService, FileUploadData } from '@vality/swag-dark-api';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { createApi, ApiMethodParams } from '../utils';

@Injectable()
export class FilesService extends createApi(ApiFilesService) {
    constructor(injector: Injector, private http: HttpClient) {
        super(injector);
    }

    uploadFiles(files: File[]) {
        return forkJoin(
            files.map((file) =>
                this.getUploadLink().pipe(
                    switchMap((uploadData) =>
                        forkJoin([of(uploadData.fileId), this.uploadFileToUrl(file, uploadData.url)])
                    ),
                    map(([fileId]) => fileId)
                )
            )
        );
    }

    getFileInfo = (params: ApiMethodParams<ApiFilesService['getFileInfo'], 'xRequestID'>) => {
        return super.getFileInfo(params).pipe(
            map((file) => ({
                ...file,
                fileName: decodeURI(file.fileName),
            }))
        );
    };

    private uploadFileToUrl(file: File, url: string): Observable<any> {
        return this.http.put(url, file, {
            headers: {
                /* eslint-disable @typescript-eslint/naming-convention */
                'Content-Disposition': `attachment;filename=${encodeURI(file.name)}`,
                'Content-Type': '',
                /* eslint-enable @typescript-eslint/naming-convention */
            },
        });
    }

    private getUploadLink(): Observable<FileUploadData> {
        return this.uploadFile({ uploadFileRequest: { metadata: {} } });
    }
}
