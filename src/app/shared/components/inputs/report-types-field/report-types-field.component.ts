import { Component, OnChanges } from '@angular/core';
import { WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { provideValueAccessor } from '@vality/ng-core';
import { Report } from '@vality/swag-anapi-v2';

import { valuesToOptions } from '@dsh/components/form-controls/utils/values-to-options';

import { ReportTypesLabelPipe } from './pipes/report-types-label.pipe';

import ReportTypeEnum = Report.ReportTypeEnum;

@Component({
    selector: 'dsh-report-types-field',
    templateUrl: 'report-types-field.component.html',
    providers: [provideValueAccessor(() => ReportTypesFieldComponent), ReportTypesLabelPipe],
})
export class ReportTypesFieldComponent extends WrappedFormControlSuperclass<ReportTypeEnum[]> implements OnChanges {
    options$ = valuesToOptions(Object.values(ReportTypeEnum), (v) => this.reportTypesLabelPipe.transform(v));

    constructor(private reportTypesLabelPipe: ReportTypesLabelPipe) {
        super();
    }
}
