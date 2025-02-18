import { Pipe, PipeTransform } from '@angular/core';
import { PaymentStatus } from '@vality/swag-payments';
import moment from 'moment';

@Pipe({
    name: 'holdActive',
    standalone: false
})
export class HoldActivePipe implements PipeTransform {
    transform(date: string | Date, status: PaymentStatus.StatusEnum): boolean {
        return moment(date).diff(moment()) > 0 && status === PaymentStatus.StatusEnum.Processed;
    }
}
