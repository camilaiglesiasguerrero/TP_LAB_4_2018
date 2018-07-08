import { Injectable } from '@angular/core';
import { MiHttpService } from './mi-http.service';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(public mihttp:MiHttpService) { }


  public GenerarToken(email:string,clave:string,tipo:string, callback: (token: string) => void) { 
      return this.mihttp.postjwt('/ingreso/',email,clave, tipo, data => { 
      var token = JSON.parse(data.text()).token;
      callback(token);
      });   
  }

  CrearUsuario(usuario: Usuario){ 
    return this.mihttp.InsertUser(usuario)
    .then(data => {
      return data;
    })
    .catch( err => {
      console.log( err );
      return null;
    });
  }


}
