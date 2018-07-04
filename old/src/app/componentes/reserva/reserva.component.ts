import { Component, OnInit } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormatoFecha } from '../../clases/formato-fecha';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

const now = new Date();

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css'],
  providers: [ {provide: NgbDateParserFormatter, useClass: FormatoFecha} ],
})
export class ReservaComponent implements OnInit {
  esParaHoy: boolean = true;
  model: NgbDateStruct;
  disabled = true;
  private _danger = new Subject<string>();
  staticAlertClosed = false;
  dangerMessage: string;
  time = {hour: now.getHours(), minute: now.getMinutes()};
  flag : boolean;

  constructor(private builder: FormBuilder, private route: ActivatedRoute,
    private router: Router) {
    this.esParaHoy = true;  
      if(localStorage.getItem("token")==undefined || localStorage.getItem("token")==null)
      {
        this.router.navigate(['/Login']);
      }
      
   }
  
  ngOnInit() {  
    this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
    this.time = {hour: now.getHours(), minute: now.getMinutes()};
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._danger.subscribe((message) => this.dangerMessage = message);
    this._danger.pipe(
      debounceTime(5000)
    ).subscribe(() => this.dangerMessage = null);
  }

  dia = new FormControl('', (control: FormControl) => {
    const value = control.value;
    if (value.day < now.getDate() || value.month < now.getMonth() || value.year < now.getFullYear()) {
      this.esParaHoy = false;
      this._danger.next(`Disculpe. Es imposible.`);
    }
    else if(value.day == now.getDate() && value.month == now.getMonth() && value.year == now.getFullYear())
        this.esParaHoy = true;
    return null;
  });

  hora = new FormControl('', (control: FormControl) => {
    const value = control.value;
    //console.info(value + this.esParaHoy);    
    if (this.esParaHoy == true && (value.hour < now.getHours() || (value.hour >= now.getHours() && value.minute < now.getMinutes()))) {
      this._danger.next(`Disculpe. Es imposible.`);
    }
    return null;
  });

  Origen = new FormControl('',[
    Validators.required
  ]);
  
  Destino = new FormControl('',[
    Validators.required
  ]);

  reservaForm: FormGroup = this.builder.group({
    fecha: this.dia,
    hora: this.hora,
    origen: this.Origen,
    destino: this.Destino,
  });

  Validar(valorCaptcha : boolean){
    this.flag = valorCaptcha;
  }

  Reservar(){
    if(!this.flag)
      this._danger.next('Por favor complete el captcha');
    else{
      this._danger.next('ARMAR API');
    }
  }

  Cancelar(){
    this.Origen.setValue('');
    this.Destino.setValue('');
    this.flag = false;
    this.router.navigate(['/Principal']);
  }
}
