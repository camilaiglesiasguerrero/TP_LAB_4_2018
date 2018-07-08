import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GalleriaModule } from 'primeng/galleria';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FileSelectDirective } from 'ng2-file-upload';

//Captcha
import { RecaptchaModule } from 'ng-recaptcha';

//MAPA
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

//RUTEO
import { RuteoModule } from './ruteo/ruteo.module';

//COMPONENTES
import { AppComponent } from './app.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { CarrouselComponent } from './componentes/carrousel/carrousel.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { MapaComponent } from './componentes/mapa/mapa.component';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { CaptchaComponent } from './componentes/captcha/captcha.component';
import { ErrorComponent } from './componentes/error/error.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { ReservaComponent } from './componentes/reserva/reserva.component';
import { NexoComponent } from './componentes/nexo/nexo.component';
import { ListadoComponent } from './componentes/listado/listado.component';
import { TipoServComponent } from './componentes/dashboard/tipo-serv/tipo-serv.component';
import { ViajesComponent } from './componentes/dashboard/viajes/viajes.component';
import { TablaComponent } from './componentes/dashboard/tabla/tabla.component';
import { FrmAltaComponent } from './componentes/frm-alta/frm-alta.component';
import { CalificacionComponent } from './componentes/dashboard/calificacion/calificacion.component';

//SERVICIOS 
import { HttpModule } from '@angular/http';
import { AuthGuardService } from './servicios/auth/auth-guard.service';
import { MiHttpService } from './servicios/mi-http.service';
import { RoleGuardService } from './servicios/auth/role-guard.service';
import { AuthService } from './servicios/auth/auth.service';
import { UsuarioService } from './servicios/usuario.service';
import { ViajeService } from './servicios/viaje.service';
import { ChoferService } from './servicios/chofer.service';

//PIPES
import { PrecioPipe } from './pipes/precio.pipe';
import { FechaPipe } from './pipes/fecha.pipe';
import { HoraPipe } from './pipes/hora.pipe';
import { DireccionPipe } from './pipes/direccion.pipe';
import { TipoVPipe } from './pipes/tipo-v.pipe';
import { MedioPPipe } from './pipes/medio-p.pipe';
import { EstrellasPipe } from './pipes/estrellas.pipe';

//DIRECTIVA
import { PrecioTipoVDirective } from './directivas/precio-tipo-v.directive';
import { EstadoDirective } from './directivas/estado.directive';

@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    FooterComponent,
    CarrouselComponent,
    MenuComponent,
    LoginComponent,
    RegistroComponent,
    MapaComponent,
    EncuestaComponent,
    PrincipalComponent,
    CaptchaComponent,
    ErrorComponent,
    DashboardComponent,
    ReservaComponent,
    PrecioPipe,
    PrecioTipoVDirective,
    NexoComponent,
    ListadoComponent,
    FechaPipe,
    HoraPipe,
    DireccionPipe,
    TipoVPipe,
    MedioPPipe,
    TipoServComponent,
    ViajesComponent,
    TablaComponent,
    EstadoDirective,
    FrmAltaComponent,
    EstrellasPipe,
    CalificacionComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    GalleriaModule,
    RecaptchaModule.forRoot(),
    NgbModule.forRoot(),
    PopoverModule.forRoot(),
    ReactiveFormsModule,
    HttpModule,
    RuteoModule,
    AgmDirectionModule,
    AgmCoreModule.forRoot({
      //bloqueada el 30/06 funciona 
      apiKey: 'AIzaSyCin-h5KlbULoPjugwtWhGFo48GlDxD1Fc',
      //apiKey: 'AIzaSyBmFOMZzSLViDvP44lp-yD9kwa-G_IuCdM',
      libraries : ['places']
    }),
    ChartModule,
    TableModule,
    ProgressSpinnerModule
  ],
  providers: [MiHttpService,
    AuthGuardService,RoleGuardService,AuthService,UsuarioService,
    ViajeService, ChoferService],
  bootstrap: [AppComponent]
})
export class AppModule { }
