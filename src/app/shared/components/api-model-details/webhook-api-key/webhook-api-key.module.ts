import { ClipboardModule } from '@angular/cdk/clipboard';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexModule } from 'ng-flex-layout';

import { WebhookApiKeyComponent } from './webhook-api-key.component';

@NgModule({
    imports: [FlexModule, TranslocoModule, ClipboardModule, MatButtonModule],
    declarations: [WebhookApiKeyComponent],
    exports: [WebhookApiKeyComponent],
})
export class WebhookApiKeyModule {}
