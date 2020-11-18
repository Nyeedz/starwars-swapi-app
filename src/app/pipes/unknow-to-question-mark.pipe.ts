import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unknownToQuestionMark',
})
export class UnknownToQuestionMarkPipe implements PipeTransform {
  transform(input: any): any {
    if (input === 'unknown') {
      return '?';
    } else {
      return input
    }
  }
}
