import { Injectable } from '@angular/core';
import { MiHttpService } from './mi-http.service';
import { Viaje } from '../clases/viaje';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {

  constructor(public mihttp:MiHttpService) { }

  crearViaje(viaje: Viaje){
    return this.mihttp.PedirViaje(viaje)
    .then(data=>{
      return data;
    })
    .catch( err => {
      console.log( err );
      return null;
    }); 
  }

  modificarViaje(viaje: Viaje){
    return this.mihttp.ModificarViaje(viaje)
    .then(data=>{
      return data;
    })
    .catch( err => {
      console.log( err );
      return null;
    }); 
  }

  TraerTodos():Promise<Array<Viaje>>{
    return  this.mihttp.TraerViajes()
     .then( data => {
       //console.log( data );
       return data;
     })
     .catch( err => {
       console.log( err );
       return null;
     });
  }

  TraerUno(id: number){
    return  this.mihttp.TraerUnViaje(id)
     .then( data => {
       
       return data;
     })
     .catch( err => {
       console.log( err );
       return null;
     });
  }

  Asignar(chofer: string, auto:string, id:number,fecha: string, hora: string){
    var unViaje: Viaje = new Viaje();
    unViaje.patente = auto;
    unViaje.remisero = (chofer.split(',')[1] + ' ' + chofer.split(',')[0]).trimRight();
    unViaje.id = id;
    unViaje.estado = 'Asignado';
    unViaje.fecha = fecha;
    unViaje.hora = hora;

    return this.mihttp.ModificarViaje(unViaje)
    .then( data => {
      this.mihttp.AsignarRA(unViaje)
      .then(data =>{
        
      }).catch(error => {
        console.log(error);
      })
      return data;
    })
    .catch( err => {
      console.log( err );
      return null;
    });
  }

  TraerOcupados():Promise<Array<Viaje>>{
      return  this.mihttp.TraerOcupados()
       .then( data => {
         //console.log( data );
         return data;
       })
       .catch( err => {
         console.log( err );
         return null;
       });
    }
}
