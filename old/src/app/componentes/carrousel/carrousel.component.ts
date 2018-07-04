import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {GalleriaModule} from 'primeng/galleria';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css']
})
export class CarrouselComponent implements OnInit {

  images: any[];
    
    ngOnInit() {
        this.images = [];
        this.images.push({source:'assets/Imagenes/flota.jpg', alt:'Contamos con una gran variedad de automóviles para adaptarnos a tus necesidades', title:'Gran cantidad de vehículos.'});
        this.images.push({source:'assets/Imagenes/ejecutivo.jpg', alt:'Autos de primera gama', title:'Vehículos Ejecutivos'});
        this.images.push({source:'assets/Imagenes/baul.jpg', alt:'Autos con baúles grandes', title:'Con gran capacidad para equipaje'});
        this.images.push({source:'assets/Imagenes/camioneta.jpg', alt:'Camionetas para pequeños fletes', title:'Camionetas'});
        this.images.push({source:'assets/Imagenes/traffic.jpg', alt:'Camionetas para traslados de muchos pasajeros', title:'Traffic'});
        this.images.push({source:'assets/Imagenes/ctacte.jpg', alt:'Contamos con servicio de cuentas corrientes para empresas', title:'Cuenta Corriente'});
    }
}
