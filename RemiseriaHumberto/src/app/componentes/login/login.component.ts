import { Component, OnInit, Output } from '@angular/core';
import { Usuario } from '../../clases/usuario';
import { UsuarioService } from '../../servicios/usuario.service';
import { Subject, observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs-compat';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario : Usuario; 
  private _danger = new Subject<string>();
  staticAlertClosed = false;
  dangerMessage: string;
  esCliente: boolean;
  tipo: string;
  seLogueo: boolean = false;
  repetidor : any; 
  tiempo: number;

  constructor(private usuarioS : UsuarioService, private route: ActivatedRoute,
    private router: Router) { 
    this.usuario = new Usuario();
    this.tipo = 'cliente';
    this.tiempo = 3;
  }

  mensaje : string;
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      if(this.router.url == '/Error/SesionExpirada')
        this.mensaje = "Tu sesión ha expirado, por favor volvé a iniciar sesión";
      else 
        this.mensaje = "";
    });
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._danger.subscribe((message) => this.dangerMessage = message);
    this._danger.pipe(
      debounceTime(5000)
    ).subscribe(() => this.dangerMessage = null);
  }

  EntrarComo(num : number){
    switch(num){
      case 1:
        this.usuario.email = 'encargado@encargado.com';
        this.usuario.clave= "encargado";
        this.usuario.tipo = "encargado";
        this.tipo = "encargado";
        localStorage.setItem("tipo","encargado");
        break;
      case 2:
        this.usuario.email = 'cliente@cliente.com';
        this.usuario.clave = 'cliente';
        this.usuario.tipo = 'cliente';
        this.tipo = 'cliente';
        localStorage.setItem("tipo","cliente");
        break;
      case 3:
        this.usuario.email = 'juancarlos@remisero.com';
        this.usuario.clave = 'remisero';
        this.usuario.tipo = 'remisero';
        this.tipo = 'remisero';
        localStorage.setItem("tipo","remisero");
        break;
      case 4:
        this.usuario.email = 'admin@admin.com';
        this.usuario.clave = 'admin';
        this.usuario.tipo = 'admin';
        this.tipo = 'admin';
        localStorage.setItem("tipo","admin");
        break;
    }
    
  }

  Entrar(){
    if(this.usuario.email==null || this.usuario.clave==null )
      {
         this._danger.next(`Por favor completar usuario y clave.`);
      }
      else
      {
        clearInterval(this.repetidor);
        this.repetidor = setInterval(()=>{ 
          this.seLogueo = true;
          this.tiempo--;
          if(this.tiempo==0 ) {
            clearInterval(this.repetidor);
            this.Logueo();
            this.tiempo=3;
          }
          }, 900);     
          
    }
  }

  Logueo(){   
    this.seLogueo = false;
      try{
        this.usuario.tipo = this.tipo;
        var respuesta =  this.usuarioS.GenerarToken(this.usuario.email,this.usuario.clave,this.usuario.tipo, token => { 
          if(token!=undefined)
          {
            localStorage.setItem("token",token);
            localStorage.setItem("usuario",this.usuario.email);
            localStorage.setItem("tipo",this.usuario.tipo);
            if(this.usuario.tipo == 'cliente') 
              this.router.navigate(['/Reserva']);
            else if(this.usuario.tipo == 'admin')
              this.router.navigate(['/Dashboard']);
            else if(this.usuario.tipo == 'remisero' || this.usuario.tipo == 'encargado')
              this.router.navigate(['/Viajes']);
          }
          else{
            this._danger.next("No se pudo ingresar, vuelva a intentar");
          }

      });
    }catch(error){ 
      this._danger.next(error + "No se pudo ingresar, vuelva a intentar");
    }
  }
}
