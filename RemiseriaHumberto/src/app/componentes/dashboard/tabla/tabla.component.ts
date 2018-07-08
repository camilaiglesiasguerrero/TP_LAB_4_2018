import { Component, OnInit } from '@angular/core';
import { Viaje } from '../../../clases/viaje';
import { ViajeService } from '../../../servicios/viaje.service';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas'; 

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

