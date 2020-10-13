import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booktitle'
})
export class BooktitlePipe implements PipeTransform {

  lowerCaseWords: Array<string> = ['and', 'by', 'from', 'of', 'the'];

  capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  transform(value: string): string {
    let titleArray: Array<string> = value.split(' ');
    titleArray.forEach((item, index) => {
      item = item.toLowerCase();
      if ( index === 0 || this.lowerCaseWords.indexOf(item) < 0 ) {
        item = this.capitalize(item);
      }
      titleArray[index] = item;
    })
    return titleArray.join(' ');
  }

}
