import { Component, ElementRef, NgModule, NgZone, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';
import { MiHttpService } from  '../../servicios/mi-http.service';
import { Router } from '@angular/router';
/// <reference path="<relevant path>/node_modules/@types/googlemaps/index.d.ts" />
import {} from '@types/googlemaps';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';



@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  @ViewChild('search') public searchElement: ElementRef;
  @ViewChild('search2') public search2Element: ElementRef;
  @ViewChild('search3') public search3Element: ElementRef;
  @ViewChild('search4') public search4Element: ElementRef;

  @Output() direccion: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  @Input() tipoV: string;
  
  @Input() origen: string;
  @Input() destino: string;
  @Input() esModificacion:boolean;
  @Input() distancia:string;
  @Input() duracion:string;

  private _danger = new Subject<string>();
  staticAlertClosed = false;
  dangerMessage: string;
  laDuracion : string ="";
  laDistancia: string ="";
  laDistanciaMts: string;

  lat: number = -34.662773;
  lng: number = -58.364343;
  public zoom: number;
  ori: string;
  dest: string;
  tengoOrigen : boolean;
  tengoDestino : boolean;
  markers: marker[] = []
  misDirecciones : Array<any>;
  elMensaje:string;
  public latitude: number;
  public longitude: number;
  public provideRouteAlternatives:boolean;
  public origin: {} = {
    lat: 0,
    lng: 0
  }
  public destination: {} = {
    lat: 0,
    lng: 0
  }
  public waypoints: object [];
  public travelMode;

  constructor(private MihttpServ:MiHttpService,private router: Router,
    private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { 
  
    this.zoom = 15;
    localStorage.setItem("Origen","");
    localStorage.setItem("OrigenLat","");
    localStorage.setItem("OrigenLng","");
    localStorage.setItem("Destino","");
    localStorage.setItem("DestinoLat","");
    localStorage.setItem("DestinoLng","");
    localStorage.setItem("Duracion","");
    localStorage.setItem("Distancia","");
    this.tengoOrigen = false;
    this.tengoDestino = false;
  }

  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._danger.subscribe((message) => this.dangerMessage = message);
    this._danger.pipe(
      debounceTime(5000)
    ).subscribe(() => this.dangerMessage = null);
    
    this.mapsAPILoader.load().then(
      () =>  {
        let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types: ["address"] });
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            let place : google.maps.places.PlaceResult = autocomplete.getPlace();      
            this.ori = place.formatted_address; 
            //this.conDirec(place.formatted_address);
            
            if(place.geometry === undefined || place.geometry === null){
              
              return;
            }
          });
        });

        return;

      }
    );
    this.mapsAPILoader.load().then(
      () =>  {
        let autocomplete = new google.maps.places.Autocomplete(this.search2Element.nativeElement, { types: ["address"] });
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            let place : google.maps.places.PlaceResult = autocomplete.getPlace();      
            this.dest = place.formatted_address;
            //this.conDirec(place.formatted_address);
            
            if(place.geometry === undefined || place.geometry === null){
              
              return;
            }
          });
        });

        return;

      }
    );

    this.mapsAPILoader.load().then(
      () =>  {
        let autocomplete = new google.maps.places.Autocomplete(this.search3Element.nativeElement, { types: ["address"] });
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            let place : google.maps.places.PlaceResult = autocomplete.getPlace();      
            this.ori = place.formatted_address;
            //this.conDirec(place.formatted_address);
            
            if(place.geometry === undefined || place.geometry === null){
              
              return;
            }
          });
        });

        return;

      }
    );
    this.mapsAPILoader.load().then(
      () =>  {
        let autocomplete = new google.maps.places.Autocomplete(this.search4Element.nativeElement, { types: ["address"] });
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            let place : google.maps.places.PlaceResult = autocomplete.getPlace();      
            this.dest = place.formatted_address;
            //this.conDirec(place.formatted_address);
            
            if(place.geometry === undefined || place.geometry === null){
              
              return;
            }
          });
        });

        return;

      }
    );
  }

  OrigenOut(any: any){
    if(this.ori != '' && this.ori != undefined)
      this.tengoOrigen = true;
    else if(this.origen != undefined){
      this.ori = this.origen;
      this.tengoOrigen = true;  
    }
    else 
      this.tengoOrigen = false;
    
    this.chequear();
  }


  
  DestinoOut(any: any){
    if(this.dest != undefined && this.dest != '')
    {
      this.tengoDestino = true;
    }
    else if(this.destino != undefined){
      this.dest = this.destino;
      this.tengoDestino = true;
    }
    else 
      this.tengoDestino = false;
    this.chequear();
  }

  chequear(){
    if(this.tengoOrigen && this.tengoDestino)
      this.conDirec();
    else
      return;
  }

  conDirec(){
    this.provideRouteAlternatives = true;

    var key = "&key=*******************";
   
    
    var url = "https://maps.googleapis.com/maps/api/geocode/json?address=";
    
    //SACO LAT Y LONG ORIGEN
    this.MihttpServ.traerLugar(url+this.ori+key)
    .then(
      data => {
        localStorage.setItem("OrigenLat",data.results[0].geometry.location.lat);
        localStorage.setItem("OrigenLng",data.results[0].geometry.location.lng);
        localStorage.setItem("Origen",data.results[0].formatted_address);
        this.origin = 
        { 
          lat: data.results[0].geometry.location.lat,
          lng: data.results[0].geometry.location.lng
        }
        //SACO LAT Y LONG DESTINO
        this.MihttpServ.traerLugar(url+this.dest+key)
        .then(
          data => {
            localStorage.setItem("DestinoLat",data.results[0].geometry.location.lat);
            localStorage.setItem("DestinoLng",data.results[0].geometry.location.lng);
            localStorage.setItem("Destino",data.results[0].formatted_address);
            this.destination = 
            { 
              lat: data.results[0].geometry.location.lat,
              lng: data.results[0].geometry.location.lng
            }
            
            this.enviarAlForm();    
             //SACO DISTANCIAS Y TIEMPOS
             url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins='+localStorage.getItem("Origen")+'&destinations='+localStorage.getItem("Destino")+key;
             //url = 'https://maps.googleapis.com/maps/api/directions/json?origin='+localStorage.getItem("Origen")+'&destination='+localStorage.getItem("Destino")+'&alternatives=true'+key;
            //console.log(url);
             this.MihttpServ.traerLugar(url)
             .then(
               data => {  
                  this.distancia = "La distancia es " + data.rows[0].elements[0].distance.text;
                  this.duracion = " y la duración aproximada de viaje " + data.rows[0].elements[0].duration.text;
                  this.laDistanciaMts = data.rows[0].elements[0].distance.value;
                  localStorage.setItem("Duracion",data.rows[0].elements[0].duration.text);
                  localStorage.setItem("Distancia",data.rows[0].elements[0].distance.text);
                  localStorage.setItem("DistanciaMts",data.rows[0].elements[0].duration.value);
                      /*PARA EL DIRECTIONS - DIRECCIONES MULTIPLES - NO FUNCIONA LA OPCION DEL MAPA */
                //this.elMensaje = "Existen " + data.routes.length + ' rutas para llegar a destino. Seleccione la de preferencia: ' 
                //this.misDirecciones = data.routes;
                //localStorage.setItem('viajeOpcion',data.routes[0].summary);
                //localStorage.setItem('duracion',data.routes[0].legs[0].duration['text']);
                //localStorage.setItem('distancia',data.routes[0].legs[0].distancia['text']);              
                //this.distancia = data.    
                
               })
             .catch(e=>{
               //this._danger.next(e + "No se pudo calcular distancia y tiempo viaje.");
            }); 
          })
        .catch(e=>{
          this._danger.next("Por favor verifique destino de viaje.");
        });
      })
    .catch(e=>{
      this._danger.next("Por favor verifique origen de viaje.");
    });
  }

  enviarAlForm(){
    this.direccion.emit(true);
  }

  eligeDireccion(summary: string,duracion:string,distancia:string){
    localStorage.setItem('viajeOpcion',summary);
    localStorage.setItem('duracion',duracion);
    localStorage.setItem('distancia',distancia);
    
  }
  
}

interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
