import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { pluck } from 'rxjs/operators';

import { ShopInfo } from '../../../operations/operators';

@Component({
    selector: 'dsh-create-report-form',
    templateUrl: 'create-report-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateReportFormComponent {
    @Input() form: UntypedFormGroup;
    @Input() shopsInfo: ShopInfo[];

    isMobile$ = this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).pipe(pluck('matches'));

    constructor(private breakpointObserver: BreakpointObserver) {}
}
