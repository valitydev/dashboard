import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

import { Report } from '../../../../api-codegen/anapi';

@Pipe({
    name: 'reportStatusName',
})
export class ReportStatusNamePipe implements PipeTransform {
    constructor(private transloco: TranslocoService) {}

    transform(status: Report.StatusEnum): string {
        switch (status) {
            case 'pending':
            case 'created':
                return this.transloco.translate(`status.${status}`, null, 'reports|scoped');
            default:
                return status;
        }
    }
}