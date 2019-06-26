import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { InputsComponent } from './inputs.component';
import { FormControlsModule } from '../../form-controls';
import { LayoutModule } from '../../layout';
import { StatusModule } from '../../status';

@NgModule({
    imports: [
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        FormControlsModule,
        LayoutModule,
        FlexLayoutModule,
        StatusModule
    ],
    declarations: [InputsComponent]
})
export class InputsModule {}
