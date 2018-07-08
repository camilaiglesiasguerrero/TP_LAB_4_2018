import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChoferService } from '../../servicios/chofer.service';
import { Remisero } from '../../clases/remisero';
import { AutoService } from '../../servicios/auto.service';
import { Viaje } from '../../clases/viaje';
import { ViajeService } from '../../servicios/viaje.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Auto } from '../../clases/auto';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas'; 
import { EncargadoService } from '../../servicios/encargado.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  private _danger = new Subject<string>();
  staticAlertClosed = false;
  dangerMessage: string;

  @Input() asignar:boolean;
  @Input() sonViajes: boolean;
  @Input() sonAutos: boolean;
  @Input() sonRemiseros: boolean;
  @Input() sonEncargados: boolean;
  @Input() listado: Array<any>;

  listoAsignar:boolean = true;
  aAsignar : boolean;
  viajeEditar: boolean;
  cual : any;
  deshabilitado: boolean;
  esCliente: boolean;
  esEncargado:boolean;
  esRemisero:boolean;
  remiseros: Array<any>;
  autos: Array<any>;
  unViaje: Viaje;
  auto: string;
  chofer: string;
  ARV : Array<any>;
  activo : boolean;
  
  habilitaEdicion:boolean;
  elId:number;
  remiseroM : Remisero;
  nombre : string;
  apellido:string;
  email:string;
  telefono:number;
  autoM : Auto;
  categoria: string;
  marca: string;
  modelo: string;
  patente: string;
  finalizar : boolean = false;
  valor: number;
  medioP : string;

  constructor(private route: ActivatedRoute, private router: Router, 
    private choferS : ChoferService, private autoS : AutoService, private viajeS: ViajeService, private encargadoS:EncargadoService) {
    switch(localStorage.getItem("tipo")){
      case "cliente":
        this.esCliente = true;
        this.esEncargado = false;
        this.esRemisero = false;
        break;
      case "encargado":
        this.esCliente = false;
        this.esEncargado = true;
        this.esRemisero = false;
        break;
      case "admin":
        this.esCliente = true;
        this.esEncargado = true;
        this.esRemisero = true;
        break;
      case "remisero":
        this.esCliente = false;
        this.esEncargado = false;
        this.esRemisero = true;
        break;
    }
  }


  ngOnInit() {    
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._danger.subscribe((message) => this.dangerMessage = message);
    this._danger.pipe(
      debounceTime(5000)
    ).subscribe(() => this.dangerMessage = null);

    var aux : Array<any>;
    this.remiseros = new Array<any>();
    if(this.esEncargado){
      this.choferS.TraerTodos()
      .then(data => {
        this.remiseros = data;
        this.remiseros = this.remiseros.filter(datos => datos.estado === 'Activo');       
        
      })
      .catch(e => {
        console.log(e);
      });

        this.autoS.TraerTodos()
        .then(data => {
          this.autos = data;
          this.autos = this.autos.filter(datos => datos.estado === 'Activo');
          if(this.autos.length == 0)
            this.autos.push({patente:'No hay disponible'});
        })
        .catch(e => {
          console.log(e);
        });
        
        //VER COMO HACER PARA QUE SI ESTA OCUPADO EN ESE DIA Y HORARIO NO LO PUEDA ASIGNAR
        
        /*this.ARV = new Array<any>(); 
        this.viajeS.TraerOcupados()
        .then(data => {
          this.ARV = data;
        })
        .catch(e => {
          console.log(e);
        });*/
    }
    
  }

  Editar(id: number){
    if(this.sonViajes)
      this.router.navigate(['/Reserva', {id: id}]);
  }
  
  EditFrm(item: any){
    this.habilitaEdicion = true;
    if(this.sonRemiseros){
      this.elId = item.id;
      this.nombre = item.nombre;
      this.apellido = item.apellido;
      this.telefono = item.telefono;
      this.email = item.email;
      this.remiseroM = new Remisero();
      this.remiseroM.id = this.elId;
      this.remiseroM.nombre =  this.nombre;
      this.remiseroM.apellido =  this.apellido;
      this.remiseroM.telefono =  this.telefono;
      this.remiseroM.email = this.email;
    }
    else if(this.sonAutos){
      this.elId = item.id;
      this.categoria = item.categoria;
      this.marca = item.marca;
      this.modelo = item.modelo;
      this.patente = item.patente;
      this.autoM = new Auto();
      this.autoM.id = item.id;
      this.autoM.categoria = item.categoria;
      this.autoM.marca = item.marca;
      this.autoM.modelo = item.modelo;
      this.autoM.patente = item.patente;
    }else if(this.sonEncargados){
      this.elId = item.id;
      this.nombre = item.nombre;
      this.apellido = item.apellido;
      this.telefono = item.telefono;
      this.email = item.email;
      this.remiseroM = new Remisero();
      this.remiseroM.id = this.elId;
      this.remiseroM.nombre =  this.nombre;
      this.remiseroM.apellido =  this.apellido;
      this.remiseroM.telefono =  this.telefono;
      this.remiseroM.email = this.email;
    }
  }

  Guardar(item: any){
    if(this.sonAutos){
      let elAuto = new Auto();
      elAuto.id = this.elId;
      this.marca == '' ? elAuto.marca = this.autoM.marca : elAuto.marca = this.marca;
      this.modelo == '' ? elAuto.modelo = this.autoM.modelo :elAuto.modelo = this.modelo;
      this.patente == '' ? elAuto.patente = this.autoM.patente :elAuto.patente = this.patente;
      elAuto.categoria = this.categoria;
      
      this.autoS.ModificarUno(elAuto)
      .then(data => {
        for (let index = 0; index < this.listado.length; index++) {
          if(this.listado[index].id == this.elId){
            this.listado[index].marca = elAuto.marca;
            this.listado[index].modelo = elAuto.modelo;
            this.listado[index].patente = elAuto.patente;
            this.listado[index].categoria = elAuto.categoria;
          }
        }
        this.habilitaEdicion = false;
      })
      .catch(e =>{
        this._danger.next(e);
      });

    }else if(this.sonRemiseros){
      let elRemisero = new Remisero();
      elRemisero.id = this.elId;
      this.nombre == '' ? elRemisero.nombre = this.remiseroM.nombre : elRemisero.nombre = this.nombre;
      this.apellido == '' ? elRemisero.apellido = this.remiseroM.apellido :elRemisero.apellido = this.apellido;
      this.telefono == null ? elRemisero.telefono = this.remiseroM.telefono :elRemisero.telefono = this.telefono;
      
      
      this.choferS.ModificarUno(elRemisero)
      .then(data => {
        for (let index = 0; index < this.listado.length; index++) {
          if(this.listado[index].id == this.elId){
            this.listado[index].nombre = elRemisero.nombre;
            this.listado[index].apellido = elRemisero.apellido;
            this.listado[index].telefono = elRemisero.telefono;
          }
        }
        this.habilitaEdicion = false;
      })
      .catch(e =>{
        this._danger.next(e);
      });

    }else if(this.sonEncargados){
      let elRemisero = new Remisero();
      elRemisero.id = this.elId;
      this.nombre == '' ? elRemisero.nombre = this.remiseroM.nombre : elRemisero.nombre = this.nombre;
      this.apellido == '' ? elRemisero.apellido = this.remiseroM.apellido :elRemisero.apellido = this.apellido;
      this.telefono == null ? elRemisero.telefono = this.remiseroM.telefono :elRemisero.telefono = this.telefono;
      
      this.encargadoS.ModificarUno(elRemisero)
      .then(data => {
        for (let index = 0; index < this.listado.length; index++) {
          if(this.listado[index].id == this.elId){
            this.listado[index].nombre = elRemisero.nombre;
            this.listado[index].apellido = elRemisero.apellido;
            this.listado[index].telefono = elRemisero.telefono;
          }
        }
        this.habilitaEdicion = false;
      })
      .catch(e =>{
        this._danger.next(e);
      });
  }
}

  Preparar(item:any){
    //console.log(item);
    this.finalizar = true;
    this.valor = item.valor;
    this.medioP = item.medioPago;
    this.elId = item.id;
  }

  Finalizar(id:number){
    var unViaje = new Viaje();
    unViaje.id = id;
    unViaje.estado = "Finalizado";
    unViaje.medioPago = this.medioP;
    unViaje.valor = this.valor;
    this.finalizar =false;

    this.viajeS.modificarViaje(unViaje)
      .then(dato => {
        this.viajeS.TraerTodos()
          .then(datos=>{
            this.listado = datos;
            this.choferS.TraerUno(localStorage.getItem("usuario"))
            .then(data => {
              var nombre = data.nombre + ' ' + data.apellido;
              this.listado = this.listado.filter(datos=> datos.chofer === nombre);
              for (let index = 0; index < this.listado.length; index++) {
                if(this.listado[index].estado == 'Finalizado' )
                  this.listado[index].deshabilitado = true;
              }
              
            })
            //this.ngOnInit();
            })
            .catch(error => {this._danger.next(error)
            });     
         }).catch(e => {
          this._danger.next(e);
        });
  }

  Cancelar(id:number){
    var unViaje = new Viaje();
    unViaje.id = id;
    unViaje.estado = "Cancelado";
    
    this.viajeS.modificarViaje(unViaje)
      .then(dato => {
        this.viajeS.TraerTodos()
          .then(datos=>{
            this.listado = datos;
            this.listado = this.listado.filter(datos => (datos.solicitante == localStorage.getItem('usuario')));
            for (let index = 0; index < this.listado.length; index++) {
              if(this.listado[index].id == id)
                this.listado[index].deshabilitado = true;
              
            }
            this.ngOnInit();
            })
            .catch(error => {this._danger.next(error)
            });     
         }).catch(e => {
          this._danger.next(e);
        });
  }

  Inhabilitar(id: number, estado: string){
    var newEstado;
    if(estado == 'Activo'){
      newEstado = 'Inactivo';  
      this.activo = false;
    }
    else{
      this.activo = true;
      newEstado = 'Activo';
    }
    
    if(this.sonAutos){
      let auto = new Auto();
      auto.id = id;
      auto.estado = newEstado;
      this.autoS.ModificarUno(auto)
      .then(data => {
        this.autoS.TraerTodos()
        .then(datos =>{
          this.listado = datos;
        })
        .catch(e => {
          this._danger.next(e);
        })
      });
   
    }else if(this.sonRemiseros){
      let remisero = new Remisero();
      remisero.id = id;
      remisero.estado = newEstado;
      this.choferS.ModificarUno(remisero)
      .then(data => {
        this.choferS.TraerTodos()
        .then(datos =>{
          this.listado = datos;
        })
        .catch(e => {
          this._danger.next(e);
        });
      })
    }else if(this.sonEncargados){
      let encargado = new Remisero();
      encargado.id = id;
      encargado.estado = newEstado;
      this.encargadoS.ModificarUno(encargado)
      .then(data => {
        this.encargadoS.TraerTodos()
        .then(datos =>{
          this.listado = datos;
        })
        .catch(e => {
          this._danger.next(e);
        });
      })
    }
  }

  PrepararAsignacion(id:number, fecha: string, hora:string){
    this.aAsignar = true;
    this.listoAsignar = false;
    this.elId = id;
  
  }

    Asignar(id:number, fecha: string, hora:string){
      this.listoAsignar =true;
      this.aAsignar = true;
      if(this.chofer != ', No hay disponibles' && this.auto != undefined && this.chofer != undefined){
        this.viajeS.Asignar(this.chofer, this.auto, id, fecha, hora)
        .then(data => {
          this.viajeS.TraerTodos()
          .then(datos=>{
            this.listado = datos;
            this.listado = this.listado.filter(datos => (datos.estado == 'Nuevo' || datos.estado == 'Modificado') && (datos.chofer === '' || datos.auto === ''));
            this.ngOnInit();
          })
            .catch(error => {this._danger.next(error)
          });     
        }).catch(e => {
          this._danger.next(e);
        });
      }
      else
      {  
        this._danger.next("No se puede asignar. Revise por favor.");
      }
    }

    public Exportar()  
  {  
    var data = document.getElementById('contentToConvert');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 15;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('Viajes.pdf'); // Generated PDF   
    });  
  }  

  }

  

