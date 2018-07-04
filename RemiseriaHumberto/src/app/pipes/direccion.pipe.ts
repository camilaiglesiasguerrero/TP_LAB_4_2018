import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'direccion'
})
export class DireccionPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value != undefined && value.includes(','))
    {
      var aux = value.split(',');
      var aux2 = aux[1].split(' ');
      return aux[0] + ', ' + aux2[2];
    }
      return;
  }

}
