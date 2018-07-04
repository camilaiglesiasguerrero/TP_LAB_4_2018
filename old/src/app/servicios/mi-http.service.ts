import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } 
from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Cliente } from '../clases/cliente';


@Injectable()
export class MiHttpService {

  url : string = "http://localhost:7070/tpfinal/api/";
  headers: Headers;
  options: RequestOptions;

  constructor( public http: Http ) {     
    this.headers = new Headers({ 'Content-Type': 'application/json', 
    'Accept': 'q=0.8;application/json;q=0.9' });
    this.options = new RequestOptions({ headers: this.headers });   
  }

  postjwt(ruta:string,usuario:string,clave:string, callback: (r: Response) => void)
  {
    let data = new URLSearchParams();
    data.append('usuario',usuario);
    data.append('clave', clave);
    this.http
      .post(this.url+ruta,data)
      .map(res => res)  
      .subscribe(callback, 
        error => {
          alert("Usuario y/o Clave no son válidos");
        });
  }

  CrearCliente(cliente: Cliente){ 
   
    let data = new URLSearchParams();
    data.append('tipo', cliente.tipo);
    data.append('usuario', cliente.usuario);
    data.append('clave', cliente.clave);
    data.append('direccion',cliente.direccion);
    data.append('telefono',cliente.telefono);
    
    return this.http
      .post(this.url + 'Usuario', data)
        .subscribe(data => {
            console.log(data);
        }, error => {
            console.log(error.json());
        });
  }



}
