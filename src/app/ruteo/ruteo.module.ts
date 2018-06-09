//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//can Activate
import { AuthService } from '../servicios/auth/auth.service';
import { AdministradorAuthService } from '../servicios/auth/administrador-auth.service';

//ruteo
import { RouterModule, Routes } from '@angular/router';

//componentes
import { PrincipalComponent } from '../componentes/principal/principal.component';
import { LoginComponent } from '../componentes/login/login.component';
import { EncuestaComponent } from '../Componentes/encuesta/encuesta.component';
import { ErrorComponent } from '../componentes/error/error.component';
import { RegistroComponent } from '../Componentes/registro/registro.component';
import { ListadoComponent } from '../componentes/listado/listado.component';
import { ReservaComponent } from '../componentes/reserva/reserva.component';

const MiRuteo = [
  {path: '' , component: PrincipalComponent},
  {path:'Principal', component: PrincipalComponent},
  {path:'Ingresar', component: LoginComponent},
  {path: 'Encuesta', component: EncuestaComponent, canActivate: [AdministradorAuthService] },
  {path: 'Registro', component: RegistroComponent},
  {path: 'Reserva', component: ReservaComponent},
  {path: 'Reservas', component: ListadoComponent},
  {path:'**', component: ErrorComponent}
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(MiRuteo)
  ],
  exports: [ RouterModule
  ]
})
export class RuteoModule { }
