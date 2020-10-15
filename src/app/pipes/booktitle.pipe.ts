import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booktitle'
})
export class BooktitlePipe implements PipeTransform {

  lowerCaseWords: Array<string> = ['and', 'by', 'from', 'in', 'of', 'the', 'to'];

  capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  transform(value: string): string {
    let titleArray: Array<string> = value.toLowerCase().split(/( |-)/);
    
    titleArray.forEach((word, index) => {

      if (index === 0) {
        titleArray[index] = this.capitalize(titleArray[index]);
      } else if ( (word === ' ' || word === '-') && this.lowerCaseWords.indexOf(titleArray[index + 1]) < 0 ) {
        titleArray[index + 1] = this.capitalize(titleArray[index + 1]);
      }
    });
    return titleArray.join('');
  }
}