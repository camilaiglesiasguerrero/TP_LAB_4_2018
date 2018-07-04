import { Component, OnInit } from '@angular/core';
import { ViajeService } from '../../../servicios/viaje.service';
import { ChoferService } from '../../../servicios/chofer.service';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.css']
})
export class ViajesComponent implements OnInit {

  data: any;
  remiseros: Array<any>;
  labels : Array<any>;
  qty : Array<any>;

    constructor(private viajeS : ViajeService, private choferS : ChoferService) {
      var aux : Array<any>;
      this.remiseros = new Array<any>();
      this.labels = new Array<any>();
      this.qty = new Array<any>();

      this.choferS.TraerTodos()
      .then(choferes=>{
        aux=choferes;
        for (let index = 0; index < aux.length; index++) {
          var concat = aux[index].nombre + ' ' + aux[index].apellido;
          this.remiseros.push({'nombre': concat, 'cantidad': 0});          
        }

        this.viajeS.TraerTodos()
        .then(viajes => {
          aux = viajes;
          for (let index = 0; index < aux.length; index++) {
            for (let j = 0; j < this.remiseros.length; j++) {
              if(this.remiseros[j]['nombre'] == aux[index].chofer)
              {
                this.remiseros[j]['cantidad'] ++;
            }
          }  
        }

          for (let i = 0; i < this.remiseros.length; i++) {
            this.labels.push(this.remiseros[i]['nombre']);
            this.qty.push(this.remiseros[i]['cantidad']);    
          }
          this.data = {
              labels: [this.labels],
              datasets: [
                  {
                      label: 'Viajes por remisero',
                      backgroundColor: '#42A5F5',
                      borderColor: '#1E88E5',
                      data: [this.qty]
                  }
              ]
          }
        }).catch(e=> {
          
        });
      }).catch(e=>{

      });
    }

  ngOnInit() {
  }

}
