import { Injectable } from '@angular/core';
import { MiHttpService } from './mi-http.service';
import { Encuesta } from '../clases/encuesta';

@Injectable({
  providedIn: 'root'
})
export class EncuestaSService {

  constructor(public mihttp:MiHttpService) { }

  crearEncuesta(encuesta: Encuesta){
    return this.mihttp.CrearEncuesta(encuesta)
    .then(data=>{
      return data;
    })
    .catch( err => {
      console.log( err );
      return null;
    }); 
  }

}
