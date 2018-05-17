import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'name'
})
export class NamePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if (!value) return ""
    let name = value.substring(0, value.length - 2) + "*" + value.substring(value.length - 2, value.length - 1)
    return name;
  }

}