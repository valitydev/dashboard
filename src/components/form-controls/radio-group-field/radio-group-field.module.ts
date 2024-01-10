import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { GridModule } from 'ng-flex-layout';

import { RadioGroupFieldComponent } from './radio-group-field.component';

@NgModule({
    imports: [CommonModule, MatRadioModule, GridModule],
    declarations: [RadioGroupFieldComponent],
    exports: [RadioGroupFieldComponent],
})
export class RadioGroupFieldModule {}
