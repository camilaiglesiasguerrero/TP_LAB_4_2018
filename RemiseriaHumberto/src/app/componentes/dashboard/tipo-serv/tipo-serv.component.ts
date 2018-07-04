import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ViajeService } from '../../../servicios/viaje.service';

@Component({
  selector: 'app-tipo-serv',
  templateUrl: './tipo-serv.component.html',
  styleUrls: ['./tipo-serv.component.css']
})
export class TipoServComponent implements OnInit {

  data: any;

  std:number = 0;
  flete:number = 0;
  transfer:number = 0;

    constructor(private viajeS : ViajeService) {
      let aux: Array<any>;
      this.viajeS.TraerTodos().then(datos=>{
          aux = datos;
          for (let index = 0; index < aux.length; index++) {
            console.log(aux[index].tipoServicio);
            switch(aux[index].tipoServicio){
              case "std":
                this.std++;
                break;
            }
          }

          this.data = {
            labels: ['Standard','Flete','Transfer'],
            datasets: [
                {
                    data: [this.std, this.flete, this.transfer],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }]    
            };
      }); 
      
    }

    ngOnInit(){

    }
}