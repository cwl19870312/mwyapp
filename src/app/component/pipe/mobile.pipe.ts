import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mobile'
})
export class MobilePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    return value.substring(0, 3) + "****" + value.substring(7, 11);
  }

}