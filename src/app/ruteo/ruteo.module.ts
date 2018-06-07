//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//can Activate
import { EncargadoAuthModule } from '../autenticacion/encargado-auth/encargado-auth.module';

//ruteo
import { RouterModule, Routes } from '@angular/router';

//componentes
import { PrincipalComponent } from '../componentes/principal/principal.component';
import { LoginComponent } from '../componentes/login/login.component';
import { EncuestaComponent } from '../Componentes/encuesta/encuesta.component';
import { ErrorComponent } from '../componentes/error/error.component';


const MiRuteo = [
  {path: '' , component: PrincipalComponent},
  {path:'Principal', component: PrincipalComponent},
  {path:'Ingresar', component: LoginComponent},
  {path: 'Encuesta', component: EncuestaComponent, canActivate: [EncargadoAuthModule] },
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
