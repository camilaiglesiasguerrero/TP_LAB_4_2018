import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hora'
})
export class HoraPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value != undefined)
    {
      var aux = value.split(':');
      var hr = aux[0];
      var min = aux[1];
      
      return hr + ':' + min;
    }
    else return;
    }

}
