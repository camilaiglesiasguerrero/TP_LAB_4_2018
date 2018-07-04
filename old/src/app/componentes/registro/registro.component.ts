import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { UsuarioService } from '../../servicios/usuario.service';
import { Cliente } from '../../clases/cliente';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  closeResult: string;
  mensaje: string = "";
  flag: boolean = false;
  elCaptcha : string = 'jkhkjhk';
  proceso : boolean = true;
  progresoMensaje : string;
  progreso: number;
  ProgresoDeAncho:string;
  clase="progress-bar progress-bar-info progress-bar-striped ";
  private subscription: Subscription;
  servicioUsuario : UsuarioService;

  constructor(private builder: FormBuilder, private modalService: NgbModal, private route: ActivatedRoute,
    private router: Router, private usuarioS: UsuarioService) { 
      this.servicioUsuario = usuarioS;
  }

  
  open(content) {
    this.progreso=0;
    this.ProgresoDeAncho="0%";

    this.usuario.setValue('');
    this.telefono.setValue('');
    this.clave.setValue('');
    this.direccion.setValue('');
    this.captcha.setValue('');    

    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.MoverBarraDeProgreso();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  usuario = new FormControl('', [
    Validators.required,
    Validators.minLength(5)
  ]);
  
  captcha = new FormControl('', [
    Validators.required,
  ]);

  clave = new FormControl('', [
    Validators.required
  ]);

  direccion = new FormControl('',[
    Validators.required
  ]);

  telefono = new FormControl('',[
    Validators.required
  ]);


  registroForm: FormGroup = this.builder.group({
    usuario: this.usuario,
    clave: this.clave,
    telefono: this.telefono,
    captcha: this.captcha,
  });

  ngOnInit() {
    
  }


  
  resolved(captchaResponse: string) {
    this.captcha.setValue(captchaResponse);
    this.elCaptcha = captchaResponse;
    
    //console.log(`Resolved captcha with response ${captchaResponse}:`);
  }
  

  MoverBarraDeProgreso() {
    this.proceso=false;
    this.clase="progress-bar progress-bar-danger progress-bar-striped active";
    this.progresoMensaje="Verificando usuario"; 
    let timer = TimerObservable.create(200, 50);
    this.subscription = timer.subscribe(t => {
      //console.log("inicio");
      this.progreso=this.progreso+1;
      this.ProgresoDeAncho=this.progreso+20+"%";
      switch (this.progreso) {
        case 2:
        this.CrearCliente();
        break;
        case 15:
        this.clase="progress-bar progress-bar-warning progress-bar-striped active";
        //this.progresoMensaje="Validando usuario"; 
          break;
        case 30:
          this.clase="progress-bar progress-bar-Info progress-bar-striped active";
         // this.progresoMensaje="Adjustando encriptación.."; 
          break;
          case 60:
          this.clase="progress-bar progress-bar-success progress-bar-striped active";
          this.progresoMensaje="Creando usuario";
          break;
          case 75:
          this.clase="progress-bar progress-bar-success progress-bar-striped active";
        //  this.progresoMensaje="Recompilando claves facebook, gmail, chats..";
          break;
          case 85:
          this.clase="progress-bar progress-bar-success progress-bar-striped active";
         // this.progresoMensaje="Instalando KeyLogger..";
          break;
          case 99:
          this.mensaje = "Usuario creado con éxito";
          break;
        case 100:
         // console.log("final");
         
          this.subscription.unsubscribe();
          this.Registrar();
          break;
      }     
    });
  }

  Registrar(){
    this.router.navigate(['Principal']);
  }

  CrearCliente(){
    var cliente = new Cliente();
    cliente.tipo = 'Cliente';
    cliente.usuario = this.usuario.value;
    cliente.clave = this.clave.value;
    cliente.direccion = this.direccion.value;
    cliente.telefono = this.telefono.value;

    this.servicioUsuario.CrearCliente(cliente);
  }
}
