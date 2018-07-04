import { Component, OnInit } from '@angular/core';
import { Viaje } from '../../../clases/viaje';
import { ViajeService } from '../../../servicios/viaje.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {

  cars: Viaje[];

  cols: any[];

  constructor(private carService: ViajeService) { }

  ngOnInit() {
      this.carService.TraerTodos().then(cars => this.cars = cars);

      this.cols = [
          { field: 'origen', header: 'Origen' },
          {field: 'destino', header: 'Destino' },
          { field: 'chofer', header: 'Chofer' },
          { field: 'auto', header: 'Auto' }
      ];
  }
}

