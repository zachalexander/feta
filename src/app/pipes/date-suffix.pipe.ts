import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateSuffixPipe' })
export class DateSuffixPipe implements PipeTransform {

  transform(value: string): string {

    let suffix = 'th';
    let day = new Date(value).getDate();

    if (day === 1 || day === 21 || day === 31) {
      suffix = 'st'
    } else if (day === 2 || day === 22) {
      suffix = 'nd';
    } else if (day === 3 || day === 23) {
      suffix = 'rd';
    }

    return suffix;

  }

}