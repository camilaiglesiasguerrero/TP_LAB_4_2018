import { Injectable } from '@angular/core';
import { ArchivoUsuarioService } from '../servicios/archivo-usuario.service';

@Injectable()
export class UsuarioService {

  constructor(private archivoUsuarioS : ArchivoUsuarioService) { }

  GenerarToken(usuario:string,clave:string, callback: (token: string) => void){
    this.archivoUsuarioS.APIPostJWT("ingreso/",usuario,clave, token => { 
    callback(token);
    });
  }

}
