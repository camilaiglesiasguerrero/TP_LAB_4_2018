import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoV'
})
export class TipoVPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch(value){
      case "std":
        return "Standard";
      case "ej":
        return "Ejecutivo";
      case "sedan":
        return "Sedán";
      case "transfer":
        return "Transfer";
      case "flete":
        return "Pequeño flete";
      default:
        return;
    }
  }

}