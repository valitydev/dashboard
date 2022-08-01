import { NgModule } from '@angular/core';

import { ReportStatusColorPipe } from './report-status-color.pipe';

@NgModule({
    declarations: [ReportStatusColorPipe],
    exports: [ReportStatusColorPipe],
})
export class ReportPipesModule {}
