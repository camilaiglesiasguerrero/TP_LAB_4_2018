import { Injectable } from '@angular/core';
import { MiHttpService } from '../servicios/mi-http.service';

@Injectable()
export class ArchivoUsuarioService {

  constructor(public mihttp:MiHttpService) { }

  public APIPostJWT(Ruta:string,usuario:string,clave:string, callback: (token: string) => void) { 
   var rta =  this.mihttp.postjwt(Ruta ,usuario,clave, data => { 
    var tipo = JSON.parse(data.text()).tipo.tipo;
    localStorage.clear();
    localStorage.setItem("tipo",tipo);
    //console.info(localStorage);
    var token = JSON.parse(data.text()).token;
      //console.log(token);
      callback(token);
    }); 
  }

}
