import { CalificacionComponent } from "../componentes/dashboard/calificacion/calificacion.component";

export class Encuesta {
  idViaje:number;
  calificacion : number;                //1
  selectedValue: string;  //2
  precio: string;                            //3
  confort : boolean;                        //4
  limpio : boolean;                         //4
  moderno: boolean;                         //4
  tiempo: string;              //5
  tardoA: boolean;                          //5
  tardoC: boolean;                          //5
  flag: boolean;                            //5
  elegirnos: string;                 //6
  selectedPagina: string;      //7
  sugerencias : string;                     //8
    chofer:string; 

  constructor(idViaje, calificacion, selectedValue, precio, confort, limpio, moderno, tiempo, tardoA, 
    tardoC, elegirnos,selectedPagina,sugerencias, chofer){
        this.idViaje = idViaje;
        this.calificacion = calificacion;
        this.selectedValue = selectedValue;
        this.precio = precio;
        this.confort = confort;
        this.limpio = limpio;
        this.moderno = moderno;
        this.tiempo = tiempo;
        this.tardoA = tardoA;
        this.tardoC = tardoC;
        this.elegirnos = elegirnos;
        this.selectedPagina = selectedPagina;
        this.sugerencias = sugerencias;
        this.chofer = chofer;
  }
}
