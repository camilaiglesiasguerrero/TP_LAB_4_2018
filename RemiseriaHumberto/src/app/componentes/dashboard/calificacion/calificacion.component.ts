import { Component, OnInit } from '@angular/core';
import { ChoferService } from '../../../servicios/chofer.service';
import { Remisero } from '../../../clases/remisero';

@Component({
  selector: 'app-calificacion',
  templateUrl: './calificacion.component.html',
  styleUrls: ['./calificacion.component.css']
})
export class CalificacionComponent implements OnInit {

  aux = new Array<any>();
  choferes : Array<any>;

    constructor(private choferS : ChoferService) {
      
      this.choferS.TraerTodos()
      .then(data=>{
        this.choferes = data;
      });
    }


  ngOnInit() {
  }

}
