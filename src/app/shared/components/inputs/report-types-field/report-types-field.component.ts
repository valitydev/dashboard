import { Component, OnChanges } from '@angular/core';
import { FormControlSuperclass, createControlProviders } from '@vality/ng-core';
import { Report } from '@vality/swag-anapi-v2';

import { valuesToOptions } from '@dsh/components/form-controls/utils/values-to-options';

import { ReportTypesLabelPipe } from './pipes/report-types-label.pipe';

import ReportTypeEnum = Report.ReportTypeEnum;

@Component({
    selector: 'dsh-report-types-field',
    templateUrl: 'report-types-field.component.html',
    providers: [...createControlProviders(() => ReportTypesFieldComponent), ReportTypesLabelPipe],
    standalone: false,
})
export class ReportTypesFieldComponent
    extends FormControlSuperclass<ReportTypeEnum[]>
    implements OnChanges
{
    options$ = valuesToOptions(Object.values(ReportTypeEnum), (v) =>
        this.reportTypesLabelPipe.transform(v),
    );

    constructor(private reportTypesLabelPipe: ReportTypesLabelPipe) {
        super();
    }
}
