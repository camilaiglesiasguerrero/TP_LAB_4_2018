import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'medioP'
})
export class MedioPPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value == 'eft')
      return "Efectivo";
    else if(value = 'ctacte')
      return "Cuenta Corriente";
  }

}
