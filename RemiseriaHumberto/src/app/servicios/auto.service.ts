import { Injectable } from '@angular/core';
import { MiHttpService } from './mi-http.service';
import { Auto } from '../clases/auto';

@Injectable({
  providedIn: 'root'
})
export class AutoService {

  constructor(private mihttp: MiHttpService) { }

  TraerTodos():Promise<Array<AutoService>>{
    return  this.mihttp.TraerAutos()
     .then( data => {
       //console.log( data );
       return data;
     })
     .catch( err => {
       console.log( err );
       return null;
     });
  }

  CrearUno(auto: Auto){
    return this.mihttp.CrearAuto(auto)
    .then(data => {
      return data;
    })
    .catch( err => {
      console.log( err );
      return null;
    });
  }

  ModificarUno(auto: Auto){
    return this.mihttp.ModificarAuto(auto)
    .then(data => {
      return data;
    })
    .catch( err => {
      console.log( err );
      return null;
    });
  }
  
}
