import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { ViajeService } from '../../servicios/viaje.service';
import { DataLayerManager } from '@agm/core';
import { Viaje } from '../../clases/viaje';
import { EncuestaSService } from '../../servicios/encuesta-s.service';
import { Encuesta } from '../../clases/encuesta';


@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  private _danger = new Subject<string>();
  staticAlertClosed = false;
  dangerMessage: string;
  private _success = new Subject<string>();
  successMessage: string;

  elViaje : Viaje;
  encuestando : boolean = false;
  aux : any;

  constructor(private route: ActivatedRoute,
    private router: Router, private viajeS : ViajeService, private encuestaS: EncuestaSService)  {
      this.elViaje = new Viaje();
      
      
     }

  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 40000);

    this._danger.subscribe((message) => this.dangerMessage = message);
    this._danger.pipe(
      debounceTime(5000)
    ).subscribe(() => this.dangerMessage = null);

    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => 
      this.successMessage = null
    );

    this.route.params.subscribe(params => {
        this.aux = this.router.url.split('=');
        this.viajeS.TraerUno(this.aux[1])
        .then(data =>{ 
          this.elViaje = data;
          console.log(this.elViaje);
        }).catch(e =>{
          console.log(e);
        })
      });
  }

  calificacion : number = 0;                //1
  selectedValue: string = "condicionesSi";  //2
  precio = "ok";                            //3
  confort : boolean;                        //4
  limpio : boolean;                         //4
  moderno: boolean;                         //4
  tiempo: string = "tiempoOk";              //5
  tardoA: boolean;                          //5
  tardoC: boolean;                          //5
  flag: boolean;                            //5
  elegirnos: string = "Si";                 //6
  selectedPagina: string = "paginaSi";      //7
  sugerencias : string;                     //8

  TerminarEncuesta(){
    this.confort == undefined ? this.confort = null : this.confort = this.confort;
    this.limpio == undefined ? this.limpio = null : this.limpio = this.limpio;
    this.moderno == undefined ? this.moderno = null : this.moderno = this.moderno;
    this.tardoA == undefined ? this.tardoA = null : this.tardoA = this.tardoA;
    this.tardoC == undefined ? this.tardoC = null : this.tardoC = this.tardoC;
    this.sugerencias == undefined ? this.sugerencias = null : this.sugerencias = this.sugerencias;

    let encuesta = new Encuesta(this.elViaje.id, this.calificacion, this.selectedValue, this.precio, this.confort,
    this.limpio, this.moderno, this.tiempo, this.tardoA, this.tardoC, this.elegirnos, this.selectedPagina, 
    this.sugerencias, this.elViaje.chofer);
    
    this.encuestaS.crearEncuesta(encuesta)
    .then(datos => {
      this.encuestando = true;
      this._success.next("Gracias por confiar en nosotros. Te esperamos en tu próximo viaje.");
    })
    .catch(e => {
      this._danger.next("No se pudo completar la encuesta volvé a intentarlo");
    });
  }

  tiempoMal(){
    if(this.flag){
      this.flag = false;
      this.tardoA = false;
      this.tardoC = false;
    }
    else
      this.flag = true;
  }

}
