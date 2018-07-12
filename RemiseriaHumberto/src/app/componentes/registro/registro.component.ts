import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UsuarioService } from '../../servicios/usuario.service';
import { Usuario } from '../../clases/usuario';
import { Subject, observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

function copiaClave(input: FormControl) {

      if (input.root.get('clave') == null) {
        return null;
      }

      const verificar = input.root.get('clave').value === input.value;
      return verificar ? null : { mismaClave : true };
  }


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private usuarioS : UsuarioService, private builder: FormBuilder, private route: ActivatedRoute,
    private router: Router) { 
    this.tipo.setValue('cliente');
    this.tiempo = 3;
  }
  nuevoUsuario : Usuario;
  elCaptcha : string = " ";
  repetidor:any;
  tiempo:number;
  seRegistro:boolean = false;

  private _danger = new Subject<string>();
  staticAlertClosed = false;
  dangerMessage: string;

  resolved(captchaResponse: string) {
    this.captcha.setValue(captchaResponse);
    this.elCaptcha = captchaResponse; 
    //console.log(`Resolved captcha with response ${captchaResponse}:`);
  }

  email = new FormControl('', [
    Validators.required,
    Validators.minLength(5)
  ]);
  
  captcha = new FormControl('', [
    Validators.required,
  ]);

  clave = new FormControl('', [
    Validators.required
  ]);
  
  copiaClave = new FormControl('', [
    Validators.required,
    copiaClave
  ]);

  tipo = new FormControl('',[
    Validators.required,
  ])
  
  registroForm: FormGroup = this.builder.group({
    email: this.email,
    clave: this.clave,
    copiaClave: this.copiaClave,
    tipo : this.tipo,
    captcha : this.elCaptcha,
  });

  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._danger.subscribe((message) => this.dangerMessage = message);
    this._danger.pipe(
      debounceTime(5000)
    ).subscribe(() => this.dangerMessage = null);
  }
  

  Registrar(){
    this.nuevoUsuario = new Usuario();
    this.nuevoUsuario.email = this.registroForm.get('email').value;
    this.nuevoUsuario.clave = this.registroForm.get('clave').value;
    this.nuevoUsuario.tipo = this.registroForm.get('tipo').value;
  //console.log(this.nuevoUsuario);
    clearInterval(this.repetidor);
    this.repetidor = setInterval(()=>{ 
      this.seRegistro = true;
      this.tiempo--;
      if(this.tiempo==0 ) {
        clearInterval(this.repetidor);
        this.Registro();
        this.tiempo=3;
      }
      }, 900);     
    }


  Registro(){
  this.seRegistro = false;
  this.usuarioS.CrearUsuario(this.nuevoUsuario)
    .then(data => {
      if( data != "ya existe")
      {
        var respuesta =  this.usuarioS.GenerarToken(this.nuevoUsuario.email,this.nuevoUsuario.clave,this.nuevoUsuario.tipo, token => { 
        if(token!=undefined)
        {
          localStorage.setItem("token",token);
          localStorage.setItem("usuario",this.nuevoUsuario.email);
          localStorage.setItem("tipo",this.nuevoUsuario.tipo);
          if(this.nuevoUsuario.tipo == 'cliente') 
            this.router.navigate(['/Reserva']);
        }
      });
    }
    else 
      this._danger.next("El usuario ya existe. Verifique.");
    }).catch(e => {
      console.log(e);
    });   
  }
}
