import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } 
from '@angular/http';
import { map } from 'rxjs/operators'; 
import { Usuario } from '../clases/usuario';
import { Viaje } from '../clases/viaje';
import { Auto } from '../clases/auto';
import { Remisero } from '../clases/remisero';
import 'rxjs/add/operator/finally';
import { error } from 'protractor';
import { throwError } from 'rxjs';
import { errorHandler } from '@angular/platform-browser/src/browser';

@Injectable()
export class MiHttpService {

  url : string = "http://localhost:8080/fApi/api";
  headers: Headers;
  options: RequestOptions;

  constructor( public http: Http ) {     
    this.headers = new Headers({ 'Content-Type': 'application/json', 
    'Accept': 'q=0.8;application/json;q=0.9' });
    this.options = new RequestOptions({ headers: this.headers });   
  }

  postjwt(ruta:string,email:string,clave:string,tipo:string, callback: (r: Response) => void)
  {
    let data = new URLSearchParams();
    data.append('email',email);
    data.append('clave', clave);
    data.append('tipo',tipo)
    return this.http
      .post(this.url+ruta,data)
      .pipe(map(res => res))
      .subscribe(callback, 
        error => {
          alert(error._body);
           this.manejadorDeError(error);
        });
  }

  InsertUser(usuario: Usuario){ 
      let data = new URLSearchParams();
      data.append('tipo', usuario.tipo);
      data.append('email', usuario.email);
      data.append('clave', usuario.clave);
      
      return this.http
        .post(this.url + '/Usuario/', data)
          .subscribe(data => {
              console.log(data);
          }, error => {
              console.log(error.json());
          });
    }

    traerLugar(url:string)
    {
      //console.log(url);
      return this.http
      .get(url)
      .toPromise()
      .then(this.extraerDatos)
      .catch(this.manejadorDeError);
    }

    PedirViaje(viaje: Viaje){ 
      let data = new URLSearchParams();
      data.append('fecha', viaje.fecha);
      data.append('hora', viaje.hora);
      data.append('solicitante', viaje.solicitante);
      data.append('origen', viaje.origen);
      data.append('destino', viaje.destino);
      data.append('latO', viaje.latO.toString());
      data.append('latD', viaje.latD.toString());
      data.append('lngO', viaje.lngO.toString());
      data.append('lngD', viaje.lngD.toString());
      data.append('medioPago',viaje.medioPago);
      data.append('tipoServicio',viaje.tipoServ);
      data.append('Obs',viaje.obs);
      data.append('duracion',viaje.duracion);
      data.append('distancia',viaje.distancia);
      //data.append('valor',viaje.valor.toString());
      data.append('estado',viaje.estado);
      //console.log(data);

      return this.http
        .post(this.url + '/Viaje/', data)
        .toPromise()
        .then( this.extraerDatos )
        .catch( this.manejadorDeError );
    }

    ModificarViaje(viaje: Viaje){ 
      let data = new URLSearchParams();
      viaje.fecha != undefined ? data.append('fecha', viaje.fecha) : 1;
      viaje.hora != undefined ? data.append('hora', viaje.hora) : 1;
      viaje.solicitante != undefined ? data.append('solicitante', viaje.solicitante) : 1;
      viaje.origen != undefined ? data.append('origen', viaje.origen) : 1;
      viaje.destino != undefined ? data.append('destino', viaje.destino) :1 ;
      viaje.latO != undefined ? data.append('latO', viaje.latO.toString()) : 1 ;
      viaje.latD != undefined ? data.append('latD', viaje.latD.toString()) : 1;
      viaje.lngO != undefined ? data.append('lngO', viaje.lngO.toString()) : 1;
      viaje.lngD != undefined ? data.append('lngD', viaje.lngD.toString()) : 1;
      viaje.medioPago != undefined ? data.append('medioPago',viaje.medioPago) : 1;
      viaje.tipoServ != undefined ? data.append('tipoServicio',viaje.tipoServ) : 1;
      viaje.obs != undefined ? data.append('Obs',viaje.obs) : 1;
      viaje.duracion != undefined ? data.append('duracion',viaje.duracion) : 1;
      viaje.distancia != undefined ? data.append('distancia',viaje.distancia) : 1;
      viaje.valor != undefined ? data.append('valor',viaje.valor.toString()) : 1;
      viaje.remisero != undefined ? data.append('chofer',viaje.remisero) : 1;
      viaje.patente != undefined ? data.append('auto',viaje.patente) : 1;
      
      data.append('estado',viaje.estado);
      data.append('id',viaje.id.toString());
      //console.log(data);

      return this.http
        .post(this.url + '/Viaje/Modificar/', data)
        .toPromise()
        .then( this.extraerDatos )
        .catch( this.manejadorDeError );
    }

    TraerViajes(){
      return this.http
      .get( this.url + '/Viajes/')
      .toPromise()
      .then( this.extraerDatos )
      .catch( this.manejadorDeError );
    }

    TraerChoferes(){
      return this.http
      .get( this.url + '/Remiseros/')
      .toPromise()
      .then( this.extraerDatos )
      .catch( this.manejadorDeError );
    }

    TraerUnChofer(usuario:string){
      return this.http
      .get(this.url + '/Remisero/'+usuario)
      .toPromise()
      .then( this.extraerDatos )
      .catch( this.manejadorDeError );
    }

    TraerAutos(){
      return this.http
      .get( this.url + '/Autos/')
      .toPromise()
      .then( this.extraerDatos )
      .catch( this.manejadorDeError );
    }

    TraerOcupados(){
      return this.http
      .get( this.url + '/ARV/')
      .toPromise()
      .then( this.extraerDatos )
      .catch( this.manejadorDeError );
    }

    TraerUnViaje(id:number){
      return this.http
      .get(this.url + '/Viaje/'+id)
      .toPromise()
      .then( this.extraerDatos )
      .catch( this.manejadorDeError );
    }

    AsignarRA(viaje: Viaje){
      let data = new URLSearchParams();
      data.append('id',viaje.id.toString());
      data.append('fecha',viaje.fecha);
      data.append('hora',viaje.hora);
      data.append('chofer',viaje.remisero);
      data.append('patente',viaje.patente);
      data.append('estado',viaje.estado);
      //console.log(data);

      return this.http
        .post(this.url + '/Asignar/', data)
        .toPromise()
        .then( this.extraerDatos )
        .catch( this.manejadorDeError );
    }

    CrearAuto(auto: Auto){ 
      let data = new URLSearchParams();
      data.append('patente', auto.patente);
      data.append('marca',auto.marca);
      data.append('modelo',auto.modelo);
      data.append('categoria',auto.categoria);
      data.append('estado',auto.estado);
      
      return this.http
        .post(this.url + '/Auto/', data)
        .toPromise()
        .then( this.extraerDatos )
        .catch( this.manejadorDeError );
    }

    ModificarAuto(auto: Auto){ 
      let data = new URLSearchParams();
      auto.marca != undefined ? data.append('marca',auto.marca) : 1;
      auto.modelo != undefined ? data.append('modelo',auto.modelo) : 1;
      auto.patente != undefined ? data.append('patente',auto.patente) : 1;
      auto.categoria != undefined ? data.append('categoria',auto.categoria) : 1;
      
      data.append('estado',auto.estado);
      data.append('id',auto.id.toString());
      //console.log(data);

      return this.http
        .post(this.url + '/Auto/Modificar/', data)
        .toPromise()
        .then( this.extraerDatos )
        .catch( this.manejadorDeError );
    }

    CrearRemisero(remisero: Remisero){ 
      let data = new URLSearchParams();
      data.append('nombre', remisero.nombre);
      data.append('apellido',remisero.apellido);
      data.append('email',remisero.email);
      data.append('telefono',remisero.telefono.toString());
      data.append('estado',remisero.estado);
      
      return this.http
        .post(this.url + '/Remisero/', data)
        .toPromise()
        .then( this.extraerDatos )
        .catch( this.manejadorDeError );
    }

    ModificarRemisero(remisero: Remisero){ 
      let data = new URLSearchParams();
      remisero.nombre != undefined ? data.append('nombre',remisero.nombre) : 1;
      remisero.apellido != undefined ? data.append('apellido',remisero.apellido) : 1;
      remisero.telefono != undefined ? data.append('telefono',remisero.telefono.toString()) : 1;
      remisero.email != undefined ? data.append('email',remisero.email) : 1;
      remisero.calificacion != undefined ? data.append('calificacion',remisero.calificacion.toString()) : 1;

      data.append('estado',remisero.estado);
      data.append('id',remisero.id.toString());
      //console.log(data);

      return this.http
        .post(this.url + '/Chofer/Modificar/', data)
        .toPromise()
        .then( this.extraerDatos )
        .catch( this.manejadorDeError );
    }

    manejadorDeError(error:Response|any)
    { 
      return error;
    }

    extraerDatos(respuesta:Response)
    {
          //console.log(respuesta);
          return respuesta.json()||{};
    }
}