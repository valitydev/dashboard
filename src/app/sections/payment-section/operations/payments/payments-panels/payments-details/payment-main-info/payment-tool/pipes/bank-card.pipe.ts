import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'bankCard',
    standalone: false,
})
export class BankCardPipe implements PipeTransform {
    transform(value: string): string {
        return value.replace(/(.{4})/g, '$& ');
    }
}
