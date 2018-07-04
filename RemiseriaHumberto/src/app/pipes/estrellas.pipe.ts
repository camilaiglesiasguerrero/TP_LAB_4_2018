import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estrellas'
})
export class EstrellasPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let aux ='';
    
    for (let index = 0; index < value; index++) {
      aux += 'w';
     
    }
    

    
    return aux;
  }

}
