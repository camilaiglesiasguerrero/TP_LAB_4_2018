import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  user : string = "Invitado";
  estaLogueado : boolean = false;
  esEncargado : boolean = false;
  esRemisero : boolean = false;
  esCliente : boolean = false;
  esAdmin : boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) { 
    if(localStorage.getItem('usuario') == undefined){
      localStorage.setItem('usuario','Invitado@invitado'); 
    }
    var aux = localStorage.getItem('usuario');
    this.user = aux.split('@')[0];
    if(this.user != "Invitado")
    {
      this.estaLogueado = true;
      if(localStorage.getItem('tipo') == 'cliente')
      {
        this.esCliente = true;
        this.esEncargado = false;
        this.esRemisero = false;
        this.esAdmin = false;
      }
      else if(localStorage.getItem('tipo') == 'admin')
      {
        this.esAdmin = true;
        this.esCliente = true;
        this.esEncargado = true;
        this.esRemisero = true;
      }
      else if(localStorage.getItem('tipo')=="encargado")
      {
        this.esAdmin = false;
        this.esCliente = false;
        this.esEncargado = true;
        this.esRemisero = false;
      }
      else if(localStorage.getItem("tipo")=="remisero")
      {
        this.esAdmin = false;
        this.esCliente = false;
        this.esEncargado = false;
        this.esRemisero = true;
      }
    }
  }

  ngOnInit() {
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
          localStorage.setItem("usuario","Invitado");
          localStorage.setItem("token", null);
          this.estaLogueado = false;
          this.esCliente = false;
          this.esEncargado = false;
          this.esRemisero = false;
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
      case 'Registrarme':
        this.router.navigate(['/Registrarse']);
        break;
      case 'Reservar':
        if(localStorage.getItem("token") == "null" || localStorage.getItem("token") == undefined || localStorage.getItem("token") == null  )
          this.router.navigate(['/Ingresar']);
        else
          this.router.navigate(['/Reserva']); 
        break;
      case 'Dashboard':
        this.router.navigate(['/Dashboard']);
        break;
      case 'Viajes':
        this.router.navigate(['/Viajes']);
        break;
      case 'Asignar':
        this.router.navigate(['/Asignar']);
        break;
      case 'Autos':
        this.router.navigate(['/Autos']);
        break;
      case 'Encargados':
        this.router.navigate(['/Encargados']);
        break;
      case 'Remiseros':
        this.router.navigate(['/Remiseros']);
        break;
      }
  }
}