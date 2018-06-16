import { Directive, ElementRef, Input, Output } from '@angular/core';

@Directive({
  selector: '[appEstado]'
})
export class EstadoDirective {

  @Input() appEstado: string;

  constructor(public el: ElementRef) {
    
    }
  
    ngOnInit(){
      if(this.appEstado == "Cancelado")
        this.el.nativeElement.style.backgroundColor = 'red';     
      else if(this.appEstado == "En viaje")
        this.el.nativeElement.style.backgroundColor = 'green';     
    }
   

}