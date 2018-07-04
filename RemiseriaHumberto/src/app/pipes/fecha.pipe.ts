import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value!=undefined)
    {
      var aux = value.split('-');
      var dia = aux[2];
      var mes = aux[1];
      var anio = aux[0];
      aux = dia + '-' + mes + '-' + anio;
      return aux;
    }
    else return;
  }

}
