import { Directive, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appPrecioTipoV]'
})
export class PrecioTipoVDirective implements OnInit {

  @Input() valor: any;
  @Input() tipoV: any;

  constructor() { }

  ngOnInit(){
    //console.log(this.valor + '-' + this.tipoV);
   /* switch(this.tipoV){
      case "camioneta":
        return this.valor * 1.5
        
    }*/
  }

}
