import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { TranslocoModule } from '@ngneat/transloco';

import { ClaimFieldComponent } from './claim-field.component';

@NgModule({
    imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, TranslocoModule],
    declarations: [ClaimFieldComponent],
    exports: [ClaimFieldComponent],
})
export class ClaimFieldModule {}
