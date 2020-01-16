import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule, MatInputModule, MatIconModule } from '@angular/material';
import { TranslocoModule } from '@ngneat/transloco';

import { DocumentsComponent } from './documents.component';
import { ButtonModule } from '../../../button';
import { LayoutModule } from '../../../layout';
import { FilesService } from '../../../api/files';
import { FileUploaderModule } from '../../../file-uploader';
import { ReceiveClaimService } from '../receive-claim.service';
import { DocumentsRoutingModule } from './documents-routing.module';
import { FileContainerModule } from '../../claim-modification-containers';

@NgModule({
    imports: [
        DocumentsRoutingModule,
        LayoutModule,
        ButtonModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        CommonModule,
        TranslocoModule,
        FileUploaderModule,
        FileContainerModule
    ],
    declarations: [DocumentsComponent],
    providers: [FilesService, ReceiveClaimService]
})
export class DocumentsModule {}