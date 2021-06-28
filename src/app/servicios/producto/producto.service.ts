import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRespuestaServicio } from 'src/app/interfaces/generales';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private api = environment.api;
  private path = environment.path;
  private nodo = 'producto/';
  private url = `${this.api}/${this.path}/${this.nodo}`;

  constructor( private http: HttpClient ) { }

  consultaProductos = ( payload: IConsultaProductos ): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post( this.url + 'consulta-productos', payload );
    } catch (error) {
      return error;
    }
  }
}

export interface IConsultaProductos {
  limite: number;
  salto: number;
  busqueda: string;
}
