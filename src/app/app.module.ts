import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { GalleriaModule } from 'primeng/galleria';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


//Captcha
import { RecaptchaModule } from 'ng-recaptcha';

//Ruteo
import { RouterModule, Routes } from '@angular/router';
import { RuteoModule } from './ruteo/ruteo.module';

//COMPONENTES
import { AppComponent } from './app.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './Componentes/registro/registro.component';
import { EncuestaComponent } from './Componentes/encuesta/encuesta.component';
import { FooterComponent } from './Componentes/footer/footer.component';
import { ListadoComponent } from './componentes/listado/listado.component';
import { MenuComponent } from './Componentes/menu/menu.component';
import { CarrouselComponent } from './componentes/carrousel/carrousel.component';
import { ErrorComponent } from './componentes/error/error.component';
import { ReservaComponent } from './componentes/reserva/reserva.component';

//SERVICIOS
import { MiHttpService } from './servicios/mi-http.service';
import { UsuarioService } from './servicios/usuario.service';
import { HttpModule } from '@angular/http';
import { ArchivoUsuarioService } from './servicios/archivo-usuario.service';
import { AuthService } from './servicios/auth/auth.service';
import { AdministradorAuthService } from './servicios/auth/administrador-auth.service';
import { EncargadoAuthService } from './servicios/auth/encargado-auth.service';
import { EmpleadoAuthService } from './servicios/auth/empleado-auth.service';
import { ClienteAuthService } from './servicios/auth/cliente-auth.service';
//PIPE
import { FormatoHoraPipe } from './pipes/formato-hora.pipe';
import { CaptchaComponent } from './componentes/captcha/captcha.component';
import { EstadoDirective } from './Directivas/estado.directive';




@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    PrincipalComponent,
    LoginComponent,
    RegistroComponent,
    EncuestaComponent,
    FooterComponent,
    ListadoComponent,
    MenuComponent,
    CarrouselComponent,
    ErrorComponent,
    ReservaComponent,
    FormatoHoraPipe,
    CaptchaComponent,
    EstadoDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RecaptchaModule.forRoot(),
    ReactiveFormsModule,
    NgbModule.forRoot(), 
    HttpModule,
    RuteoModule,
    GalleriaModule
  ],
  providers: [MiHttpService, UsuarioService, ArchivoUsuarioService, AuthService, 
    AdministradorAuthService, EncargadoAuthService, EmpleadoAuthService, ClienteAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
