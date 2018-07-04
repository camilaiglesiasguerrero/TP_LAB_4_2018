import { Injectable } from '@angular/core';
import { MiHttpService } from './mi-http.service';
import { Remisero } from '../clases/remisero';

@Injectable({
  providedIn: 'root'
})
export class ChoferService {

  constructor(private mihttp: MiHttpService) { }

  TraerTodos():Promise<Array<ChoferService>>{
    return  this.mihttp.TraerChoferes()
     .then( data => {
       //console.log( data );
       return data;
     })
     .catch( err => {
       console.log( err );
       return null;
     });
  }

  TraerUno(usuario: string){
    return  this.mihttp.TraerUnChofer(usuario)
     .then( data => {
       
       return data;
     })
     .catch( err => {
       console.log( err );
       return null;
     });
  }

  CrearUno(remisero: Remisero){
    return this.mihttp.CrearRemisero(remisero)
    .then(data => {
      return data;
    })
    .catch( err => {
      console.log( err );
      return null;
    });
  }

  ModificarUno(remisero: Remisero){
    return this.mihttp.ModificarRemisero(remisero)
    .then(data => {
      return data;
    })
    .catch( err => {
      console.log( err );
      return null;
    });
  }

}
