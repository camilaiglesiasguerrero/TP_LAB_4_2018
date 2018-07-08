import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { AutoService } from '../../servicios/auto.service';
import { ChoferService } from '../../servicios/chofer.service';
import { Remisero } from '../../clases/remisero';
import { Auto } from '../../clases/auto';
import { EncargadoService } from '../../servicios/encargado.service';


@Component({
  selector: 'app-frm-alta',
  templateUrl: './frm-alta.component.html',
  styleUrls: ['./frm-alta.component.css']
})
export class FrmAltaComponent implements OnInit {

  private _danger = new Subject<string>();
  staticAlertClosed = false;
  dangerMessage: string;
  private _success = new Subject<string>();
  successMessage: string;

  agregar:boolean;
  sonRemiseros:boolean;
  sonAutos:boolean;
  sonEncargados:boolean;
  listado : Array<any>;

  nombre:string;
  apellido:string;
  email: string;
  telefono: number;

  marca: string;
  modelo: string;
  categoria: string;
  patente: string;

  constructor(private route: ActivatedRoute, private router: Router, 
    private autoS : AutoService, private remiseroS : ChoferService, private encargadoS : EncargadoService) { }

  ngOnInit() {
    this.agregar = false;
    this.route.params.subscribe(params => {
      if(this.router.url == '/Autos'){  
        this.sonAutos = true;
        this.sonRemiseros = false;
        this.sonEncargados = false;
        this.categoria = 'std';
        this.autoS.TraerTodos()
        .then(datos=>{
          this.listado = datos;
        }).catch(e => {
          this._danger.next(e);
        });
      }
      else if(this.router.url == '/Remiseros'){
        this.sonAutos = false;
        this.sonRemiseros = true;
        this.sonEncargados = false;
        this.remiseroS.TraerTodos()
        .then(datos=>{
          this.listado = datos;
        }).catch(e => {
          this._danger.next(e);
        });
      }
      else if(this.router.url == '/Encargados'){
        this.sonAutos = false;
        this.sonRemiseros = false;
        this.sonEncargados = true;
        
        this.encargadoS.TraerTodos()
        .then(datos=>{
          this.listado = datos;
        }).catch(e => {
          this._danger.next(e);
        });
      }
    });

    setTimeout(() => this.staticAlertClosed = true, 40000);

    this._danger.subscribe((message) => this.dangerMessage = message);
    this._danger.pipe(
      debounceTime(5000)
    ).subscribe(() => this.dangerMessage = null);

    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);

  }

  Agregar(){
    this.agregar = true;
  }

  Guardar(){
    this.agregar = false;
    if(this.sonRemiseros){
      if(this.nombre != '' && this.apellido != '' && this.email != '' && this.telefono != null
    && this.nombre != undefined && this.apellido != undefined && this.email != undefined){
        let remisero = new Remisero();
        remisero.nombre = this.nombre;
        remisero.apellido = this.apellido;
        remisero.email = this.email;
        remisero.telefono = this.telefono;
        remisero.estado = "Activo";
        remisero.pathFoto = this.selectedFile;
        this.remiseroS.CrearUno(remisero)
        .then(data =>{
          console.log(data);
          this.listado.push(remisero);
          this._success.next("Se creó el usuario para " + this.nombre + ' ' + this.apellido + '. Debe ingresar con su email, la clave es 123456, para cambiarla debe dirigirse a Mi Perfil');
        })
        .catch(e => {
          this._danger.next(e);
        });
      }
      else  
        this._danger.next("Debés completar todos los campos.");

    }else if(this.sonAutos){
      if(this.categoria != '' && this.marca != '' && this.modelo != '' && this.patente != '' &&
      this.categoria != undefined && this.marca != undefined && this.modelo != undefined && this.patente != undefined){
        let auto = new Auto();
        auto.categoria = this.categoria;
        auto.marca = this.marca;
        auto.modelo = this.modelo;
        auto.patente = this.patente;
        auto.estado = 'Activo';
        //console.log(auto);
        this.autoS.CrearUno(auto)
        .then(data =>{
          this.listado.push(auto);
        })
        .catch(e => {
          this._danger.next(e);
        });
      }else
        this._danger.next("Debés completar todos los campos.");
    }else if(this.sonEncargados){
      if(this.nombre != '' && this.apellido != '' && this.email != '' && this.telefono != null
    && this.nombre != undefined && this.apellido != undefined && this.email != undefined){
        let encargado = new Remisero();
        encargado.nombre = this.nombre;
        encargado.apellido = this.apellido;
        encargado.email = this.email;
        encargado.telefono = this.telefono;
        encargado.estado = "Activo";
        this.encargadoS.CrearUno(encargado)
        .then(data =>{
          console.log(data);
          this.listado.push(encargado);
          this._success.next("Se creó el usuario para " + this.nombre + ' ' + this.apellido + '. Debe ingresar con su email, la clave es 123456, para cambiarla debe dirigirse a Mi Perfil');
        })
        .catch(e => {
          this._danger.next(e);
        });
      }
      else  
        this._danger.next("Debés completar todos los campos.");
    }
  }

  selectedFile : File = null;

  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
  }

}
