import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateAsAgoShort'
})
export class DateAsAgoShortPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    if (!value) { return 'a long time ago'; }
    let time = (Date.now() - Date.parse(value)) / 1000;
    const divider = [60, 60, 24, 30, 12];
    const string = ['s', 'm', 'h', 'd', 'mon', 'yr'];
    let i;
    for (i = 0; Math.floor(time / divider[i]) > 0; i++) {
      time /= divider[i];
    }
    const plural = Math.floor(time) > 1 ? 's' : '';
    return Math.floor(time) + string[i];
  }

}
