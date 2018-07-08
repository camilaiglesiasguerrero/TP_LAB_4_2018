import { Injectable } from '@angular/core';
import { MiHttpService } from './mi-http.service';
import { Remisero } from '../clases/remisero';

@Injectable({
  providedIn: 'root'
})
export class EncargadoService {

  constructor(private mihttp: MiHttpService) { }

  TraerTodos():Promise<Array<EncargadoService>>{
    return  this.mihttp.TraerEncargados()
     .then( data => {
       //console.log( data );
       return data;
     })
     .catch( err => {
       console.log( err );
       return null;
     });
  }

  ModificarUno(encargado : Remisero){
    return this.mihttp.ModificarEncargado(encargado)
    .then(data => {
      return data;
    })
    .catch( err => {
      console.log( err );
      return null;
    });
  }


  CrearUno(encargado: Remisero){
    return this.mihttp.CrearEncargado(encargado)
    .then(data => {
      return data;
    })
    .catch( err => {
      console.log( err );
      return null;
    });
  }

  
}
