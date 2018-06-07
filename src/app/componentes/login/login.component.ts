import { Component, OnInit } from '@angular/core';
import { Persona } from '../../clases/persona';
import { UsuarioService } from '../../servicios/usuario.service';
import {Subject} from 'rxjs';
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

  constructor(private usuarioS : UsuarioService, private route: ActivatedRoute,
    private router: Router) { 
    this.usuario = new Persona();
  }

  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._danger.subscribe((message) => this.dangerMessage = message);
    this._danger.pipe(
      debounceTime(5000)
    ).subscribe(() => this.dangerMessage = null);
  }


Entrar(){
  if(this.usuario.usuario==null || this.usuario.clave==null)
    {
      this._danger.next(`Por favor completar usuario y clave.`);
    }
    else
    {
      var respuesta =  this.usuarioS.GenerarToken(this.usuario.usuario,this.usuario.clave, token => { 
      if(token!=undefined)
        {
          console.info (token); 
          sessionStorage.clear();
          sessionStorage.setItem("token",token);
          localStorage.setItem("usuario",this.usuario.usuario);
          this.router.navigate(['/Principal']);
        }
    });
  }
} 

logOut()
  {
    try {
      localStorage.clear();
      this.router.navigate(['/login']);
    } catch (error) {
      return false;
    }
  }

}
