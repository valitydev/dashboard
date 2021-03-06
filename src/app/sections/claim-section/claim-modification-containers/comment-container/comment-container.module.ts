import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { MessagesModule } from '@dsh/api/messages';
import { LayoutModule } from '@dsh/components/layout';

import { CommentContainerComponent } from './comment-container.component';

@NgModule({
    imports: [CommonModule, LayoutModule, FlexLayoutModule, TranslocoModule, MessagesModule],
    declarations: [CommentContainerComponent],
    exports: [CommentContainerComponent],
})
export class CommentContainerModule {}
