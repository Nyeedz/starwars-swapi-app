import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abbreviateNumber',
})
export class AbbreviateNumberPipe implements PipeTransform {
  transform(input: any): any {
    if (isNaN(input)) {
      return input;
    }

    if (input < 1e3) return input;
    if (input >= 1e3 && input < 1e6) return +(input / 1e3).toFixed(1) + ' mil';
    if (input >= 1e6 && input < 1e9) return +(input / 1e6).toFixed(1) + ' mi';
    if (input >= 1e9 && input < 1e12) return +(input / 1e9).toFixed(1) + ' bi';
    if (input >= 1e12) return +(input / 1e12).toFixed(1) + ' t';
  }
}
