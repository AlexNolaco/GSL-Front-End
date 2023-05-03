import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipePipe implements PipeTransform {

  transform(value: unknown, keys: string, term: string): unknown {
    if (!term) return value;
    return (this.format(value)).filter((item: any) => keys.split(',').some(key => item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key])));
  }

  private format(value: any) {
    return value || [];
  }
}