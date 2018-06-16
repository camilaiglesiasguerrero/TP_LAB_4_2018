import { Component, OnInit, Output } from '@angular/core';
import { Persona } from '../../clases/persona';
import { UsuarioService } from '../../servicios/usuario.service';
import { Subject } from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario : Persona; 
  private _danger = new Subject<string>();
  staticAlertClosed = false;
  dangerMessage: string;
  esCliente: boolean;

  constructor(private usuarioS : UsuarioService, private route: ActivatedRoute,
    private router: Router) { 
    this.usuario = new Persona();
  }

  
  ngOnInit() {
    this.route.params.subscribe(params => {
      if(this.router.url == '/Ingresar/Cliente')
        this.esCliente = true;
    });
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._danger.subscribe((message) => this.dangerMessage = message);
    this._danger.pipe(
      debounceTime(5000)
    ).subscribe(() => this.dangerMessage = null);
  }

Entrar(){
  if(this.usuario.usuario==null || this.usuario.clave==null )
    {
       this._danger.next(`Por favor completar usuario y clave.`);
    }
    else
    {
      var respuesta =  this.usuarioS.GenerarToken(this.usuario.usuario,this.usuario.clave, token => { 
      if(token!=undefined)
        {
          //console.info (token); 
          //sessionStorage.clear();
          //sessionStorage.setItem("token",token);
          
          localStorage.setItem("token",token);
          localStorage.setItem("usuario",this.usuario.usuario);
          if(this.esCliente) 
            this.router.navigate(['/Reserva']);
          else
            this.router.navigate(['/Dashboard']);
        }
    });
  }
}
  
  EntrarComo(num : number){
    switch(num){
      case 1:
        this.usuario.usuario = 'administrador';
        this.usuario.clave = 'admin';
        this.usuario.tipo = 'admin';
        break;
      case 2:
        this.usuario.usuario = 'cliente';
        this.usuario.clave = 'cliente';
        this.usuario.tipo = 'cliente';
        break;
      case 3:  
        this.usuario.usuario = 'encargado';
        this.usuario.clave = 'encargado';
        this.usuario.tipo = 'encargado';
        break;
      case 4:  
        this.usuario.usuario = 'remisero';
        this.usuario.clave = 'remisero';
        this.usuario.tipo = 'remisero';
        break;
    }
    this.Entrar();
  }


}
