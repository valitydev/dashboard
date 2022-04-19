import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Report } from '@vality/swag-anapi-v2';

@Pipe({
    name: 'reportTypeName',
})
export class ReportTypeNamePipe implements PipeTransform {
    constructor(private transloco: TranslocoService) {}

    transform(status: Report.ReportTypeEnum): string {
        switch (status) {
            case 'provisionOfService':
            case 'paymentRegistry':
            case 'paymentRegistryByPayout':
                return this.transloco.translate(`type.${status}`, null, 'reports');
            default:
                return status;
        }
    }
}
