import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViajeService } from '../../servicios/viaje.service';
import { ChoferService } from '../../servicios/chofer.service';


@Component({
  selector: 'app-nexo',
  templateUrl: './nexo.component.html',
  styleUrls: ['./nexo.component.css']
})
export class NexoComponent implements OnInit {

  listado : Array <any>;
  sonViajes : boolean;
  tipoUser : string;
  asignar: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private viajeS : ViajeService,
  private remiseroS : ChoferService) { 
    this.tipoUser = localStorage.getItem("tipo");
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(this.router.url == '/Viajes')
      { 
        this.sonViajes = true;
        this.armarListadoViajes();
      }
      else if(this.router.url == '/Asignar')
      {
        this.sonViajes = true;
        this.asignar = true;
        this.armarPendientes();
      }
    });
  }

  armarPendientes(){
    this.viajeS.TraerTodos()
    .then(datos=>{
      this.listado = datos;
      this.listado = this.listado.filter(datos => (datos.estado == 'Nuevo' || datos.estado == 'Modificado') && (datos.chofer === '' || datos.auto === ''));
    })
      .catch(error => {console.log(error)
    });     
  }

  armarListadoViajes(){
    this.viajeS.TraerTodos()
        .then(datos=>{
          this.listado = datos;
          //LISTADO PARA EL CLIENTE
          if(this.tipoUser == 'cliente'){
            this.listado = this.listado.filter(datos => datos.solicitante === localStorage.getItem("usuario"));
            for (let index = 0; index < this.listado.length; index++) {
              if(this.listado[index].estado == "Nuevo" || this.listado[index].estado == "Modificado" || this.listado[index].estado == "Asignado" ){
                this.listado[index].deshabilitado = false;
              }
              else{
                this.listado[index].deshabilitado = true;
              }
            }
          }

          //LISTADO PARA EL REMISERO
          else if(this.tipoUser == 'remisero'){
            
            this.remiseroS.TraerUno(localStorage.getItem("usuario"))
            .then(data => {
              var nombre = data.nombre + ' ' + data.apellido;
              this.listado = this.listado.filter(datos=> datos.chofer === nombre);
              //console.log(this.listado);
            })
            
          }
        //console.log(this.listado);       
        })
          .catch(error => {console.log(error)
        });     
  }

}
