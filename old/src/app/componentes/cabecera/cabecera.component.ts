import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
  
  logueado : boolean = false;
  constructor(private route: ActivatedRoute,
    private router: Router) {
       
    }

  @Input() usuario : any;

  ngOnInit() {
    localStorage.setItem('usuario','invitado');
    localStorage.setItem('token',null);
      
  }

  irA(donde : string){
    switch(donde)
    {
      case 'Principal':
        this.router.navigate(['/Principal']);
        break;
      case 'Deslogueo':
        try 
        {
          localStorage.setItem("tipo",null);
          localStorage.setItem("usuario","invitado");
          localStorage.setItem("token", null);
          this.logueado = false;
          this.router.navigate(['/Principal']);
        } 
        catch (error) 
        {
          return false;
        }
        break;
      case 'Logueo':
        this.router.navigate(['/Ingresar']);
        break;
      case 'Reservar':
        if(localStorage.getItem("token") == "null" || localStorage.getItem("token") == undefined || localStorage.getItem("token") == null  )
          this.router.navigate(['/Ingresar/Cliente']);
        else
          this.router.navigate(['/Reserva']); 
          
        break;
  
  }
}
    
}
