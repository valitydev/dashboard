import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';
import { ngfModule } from 'angular-file';

import { FileUploaderComponent } from './file-uploader.component';
import { FileUploaderService } from './file-uploader.service';

@NgModule({
    imports: [TranslocoModule, FlexModule, ngfModule, CommonModule],
    exports: [FileUploaderComponent],
    declarations: [FileUploaderComponent],
    providers: [FileUploaderService],
})
export class FileUploaderModule {}
