import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GalleriaModule } from 'primeng/galleria';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
import { ListadoComponent } from './Componentes/listado/listado.component';
import { MenuComponent } from './Componentes/menu/menu.component';
import { CarrouselComponent } from './Componentes/carrousel/carrousel.component';

//SERVICIOS
import { MiHttpService } from './servicios/mi-http.service';
import { UsuarioService } from './servicios/usuario.service';
import { HttpModule } from '@angular/http';
import { ArchivoUsuarioService } from './servicios/archivo-usuario.service';
import { ErrorComponent } from './componentes/error/error.component';

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
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(), 
    HttpModule,
    RuteoModule,
    GalleriaModule
  ],
  providers: [MiHttpService, UsuarioService, ArchivoUsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
