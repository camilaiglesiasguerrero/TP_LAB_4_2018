import { Component, OnInit } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormatoFecha } from '../../clases/formato-fecha';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { ViajeService } from '../../servicios/viaje.service';
import { Viaje } from '../../clases/viaje';

const now = new Date();

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css'],
  providers: [ {provide: NgbDateParserFormatter, useClass: FormatoFecha} ],
})
export class ReservaComponent implements OnInit {
  esParaHoy: boolean = true;
  model: NgbDateStruct;
  disabled = true;
  private _danger = new Subject<string>();
  staticAlertClosed = false;
  dangerMessage: string;
  time = {hour: now.getHours(), minute: now.getMinutes()};
  flag : boolean;
  esModificacion : boolean;
  latO:string;
  latD:string;
  lngO: string;
  lngD:string;
  origen:string;
  destino:string;
  distancia:string;
  duracion:string;
  id:number;

  constructor(private builder: FormBuilder, private route: ActivatedRoute,
    private router: Router, private viajeS : ViajeService) {
      var aux;
      this.route.params.subscribe(params => {
        if(this.router.url.includes(';')){
          aux = this.router.url.split('=');
          this.esModificacion = true;
        }
        else
          this.esModificacion = false;
      });  
      if(!this.esModificacion){
        this.esParaHoy = true;  
        this.medioP.setValue("eft");
        this.tipoServ.setValue("std");
      }
      else{
        this.viajeS.TraerUno(aux[1])
        .then(data =>{
          //console.log(data);
          var aux = data.fecha.split('-');
          this.model = {year: parseInt(aux[0]), month: parseInt(aux[1]), day: parseInt(aux[2])};
          this.dia.setValue({day: this.model.day,month:this.model.month,year:this.model.year} );
          //console.log(this.dia);
          aux = data.hora.split(':');
          this.time = {hour: aux[0], minute: aux[1]};
          this.hora.setValue(this.time);
          this.tipoServ.setValue(data.tipoServicio);
          this.medioP.setValue(data.medioPago);
          this.obs.setValue(data.obs);
          this.laDireccion.setValue("Ok");
          this.latO = data.latO;
          this.latD = data.latD;
          this.lngO = data.lngO;
          this.lngD = data.lngD;
          this.origen = data.origen;
          this.destino = data.destino;
          localStorage.setItem("OrigenLat",data.latO);
          localStorage.setItem("OrigenLng",data.lngO);
          localStorage.setItem("Origen",data.origen);
          localStorage.setItem("DestinoLat",data.latD);
          localStorage.setItem("DestinoLng",data.lngD);
          localStorage.setItem("Destino",data.destino);
          this.distancia = 'Distancia: ' + data.distancia; 
          this.duracion = '- Duración aproximada: ' + data.duracion;
          localStorage.setItem("Duracion",data.duracion);
          localStorage.setItem("Distancia",data.distancia);
          this.id = data.id;
        })
        .catch(e =>{
          this._danger.next("No se pudo recuperar el viaje");
        })
      }
      
   }
  
  ngOnInit() {  
    

    this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
    this.time = {hour: now.getHours(), minute: now.getMinutes()};
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._danger.subscribe((message) => this.dangerMessage = message);
    this._danger.pipe(
      debounceTime(5000)
    ).subscribe(() => this.dangerMessage = null);
  }

  dia = new FormControl('', (control: FormControl) => {
    const value = control.value;
    if (value.day < now.getDate() || value.month < now.getMonth() || value.year < now.getFullYear()) {
      this.esParaHoy = false;
      this._danger.next(`Disculpe. Es imposible.`);
    }
    else if(value.day == now.getDate() && value.month == now.getMonth() && value.year == now.getFullYear())
        this.esParaHoy = true;
    
    return null;
  });

  hora = new FormControl('', (control: FormControl) => {
    const value = control.value;
    //console.info(value + this.esParaHoy);    
    if (this.esParaHoy == true && (value.hour < now.getHours() || (value.hour >= now.getHours() && value.minute < now.getMinutes()))) {
      //this._danger.next(`Diculpe. Es imposible`);
    }
    return null;
  });

  obs = new FormControl('',[
    
  ])

  tipoServ = new FormControl('',[
    Validators.required
  ]);

  medioP = new FormControl('',[
    Validators.required
  ]);

  laDireccion = new FormControl('',[
    Validators.required
  ]);
  

  reservaForm: FormGroup = this.builder.group({
    fecha: this.dia,
    hora: this.hora,
    obs:this.obs,
    tipoServ:this.tipoServ,
    medioP:this.medioP,
    laDireccion: this.laDireccion
  });

  Validar(valorCaptcha : boolean){
    this.flag = valorCaptcha;
  }

  Reservar(){
    if(!this.flag)
      this._danger.next('Por favor completá el captcha');
    else{
      let elViaje: Viaje =  new Viaje();
      elViaje.solicitante = localStorage.getItem("usuario");
      
      elViaje.origen = localStorage.getItem("Origen");
      elViaje.destino = localStorage.getItem("Destino");
      elViaje.latO = parseFloat(localStorage.getItem("OrigenLat"));
      elViaje.lngO = parseFloat(localStorage.getItem("OrigenLng"));
      elViaje.latD = parseFloat(localStorage.getItem("DestinoLat"));
      elViaje.lngD = parseFloat(localStorage.getItem("DestinoLng"));
      elViaje.distancia = localStorage.getItem("Distancia");
      elViaje.duracion = localStorage.getItem("Duracion");
      elViaje.valor = (parseFloat(localStorage.getItem("DistanciaMts")) * 0.02);
      var aux =  this.reservaForm.get('fecha').value;
      var concat = aux.year + '-' + aux.month + '-' + aux.day;  
      elViaje.fecha = concat;
      aux = this.reservaForm.get('hora').value;
      concat = aux.hour + ':' + aux.minute;
      elViaje.hora = concat;
      elViaje.obs = this.reservaForm.get('obs').value;
      elViaje.tipoServ = this.reservaForm.get('tipoServ').value;
      elViaje.medioPago = this.reservaForm.get('medioP').value;
      
      if(!this.esModificacion){
        elViaje.estado = "Nuevo";
        this.viajeS.crearViaje(elViaje)
          .then(datos=> {
          this.router.navigate(['/Viajes']);
       })
      .catch(e => {
        this._danger.next("Se ha producido un error, intentá nuevamente");
      });
      }
      else  
      {
        elViaje.estado = "Modificado";
        elViaje.id = this.id;
        elViaje.remisero = '';
        elViaje.patente = '';
        this.viajeS.modificarViaje(elViaje)
          .then(datos=> {
          this.router.navigate(['/Viajes']);
        })
        .catch(e => {
        this._danger.next("Se ha producido un error, intentá nuevamente");
        });
      }
      
      //console.log(elViaje);
      
    }
  }

  Cancelar(){
    this.laDireccion.setValue('');
    this.flag = false;
    this.router.navigate(['/Principal']);
  }

  Direccion(tieneDireccion: boolean){
    if(tieneDireccion)
      this.laDireccion.setValue("Ok");
  }
}
