//Modules
import { NgModule } from '@angular/core';

//ruteo
import { RouterModule, Routes } from '@angular/router';

//can activate
import { AuthGuardService } from '../servicios/auth/auth-guard.service';
import { RoleGuardService } from '../servicios/auth/role-guard.service';

//componentes
import { PrincipalComponent } from '../componentes/principal/principal.component';
import { RegistroComponent } from '../componentes/registro/registro.component';
import { LoginComponent } from '../componentes/login/login.component';
import { ErrorComponent } from '../componentes/error/error.component';
import { DashboardComponent } from '../componentes/dashboard/dashboard.component';
import { ReservaComponent } from '../componentes/reserva/reserva.component';
import { NexoComponent } from '../componentes/nexo/nexo.component';
import { FrmAltaComponent } from '../componentes/frm-alta/frm-alta.component';
import { EncuestaComponent } from '../componentes/encuesta/encuesta.component';

const MiRuteo = [
  
  {path: '' , component: PrincipalComponent},
  {path:'Principal', component: PrincipalComponent},
  {path: 'Registrarse',component: RegistroComponent},
  {path: 'Ingresar', component: LoginComponent},
  {path: 'Dashboard',component: DashboardComponent, canActivate: [RoleGuardService], data: { expectedRole: 'encargado' }},
  {path: 'Viajes', component: NexoComponent, canActivate: [AuthGuardService]},
  {path: 'Reserva', component: ReservaComponent, canActivate: [RoleGuardService], data: { expectedRole: 'cliente' }},
  {path: 'Reserva/:id', component: ReservaComponent, canActivate: [RoleGuardService], data: { expectedRole: 'cliente' }},
  {path: 'Encuesta', component: EncuestaComponent, canActivate: [RoleGuardService], data: { expectedRole: 'cliente' }},
  {path: 'Encuesta/:id', component: EncuestaComponent, canActivate: [RoleGuardService], data: { expectedRole: 'cliente' }},
  {path: 'Asignar', component: NexoComponent, canActivate: [RoleGuardService], data: { expectedRole: 'encargado' }},
  {path: 'Autos', component: FrmAltaComponent, canActivate: [RoleGuardService], data: { expectedRole: 'encargado' }},
  {path: 'Remiseros', component: FrmAltaComponent, canActivate: [RoleGuardService], data: { expectedRole: 'encargado' }},
  {path: 'Encargados', component: FrmAltaComponent, canActivate: [RoleGuardService], data: { expectedRole: 'admin' }},
  {path: 'Error', component: ErrorComponent},
  {path: 'Error/SesionExpirada',component: LoginComponent},
  {path: '**', component: ErrorComponent}
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(MiRuteo)
  ],
  exports: [ RouterModule
  ]
})
export class RuteoModule { }