import { Remisero } from "./remisero";
import { Auto } from "./auto";

export class Viaje {
    id: number;
    origen: string;
    destino: string;
    latO: number;
    latD: number;
    lngO: number;
    lngD: number;
    duracion: string;
    distancia: string;
    fecha: string;
    hora: string;
    tipoServ: string;
    medioPago: string;
    valor: number;
    solicitante: string;
    chofer: Remisero;
    auto: Auto;
    estado: string;
    obs:string;
    patente: string;
    remisero: string;

}
