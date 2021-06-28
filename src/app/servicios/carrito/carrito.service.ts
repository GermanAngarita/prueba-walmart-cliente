import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRespuestaServicio } from 'src/app/interfaces/generales';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private api = environment.api;
  private path = environment.path;
  private nodo = 'carrito/';
  private url = `${this.api}/${this.path}/${this.nodo}`;

  constructor( private http: HttpClient ) { }

  crearCarrito = ( ): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post( this.url + 'crear-carrito', null );
    } catch (error) {
      return error;
    }
  }

  consultaCarrito = ( payload: IConsultaCarrito ): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post( this.url + 'consulta-carrito', payload );
    } catch (error) {
      return error;
    }
  }

  agregarProducto = ( payload: IAgregarProducto ): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post( this.url + 'agregar-producto', payload );
    } catch (error) {
      return error;
    }
  }

  eliminarProducto = ( payload: IEliminarProducto ): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post( this.url + 'eliminar-producto', payload );
    } catch (error) {
      return error;
    }
  }
}

export interface IAgregarProducto {
  idCarrito: string;
  idProducto: string;
  cantidad: number;
}

export interface IEliminarProducto {
  idCarrito: string;
  idProducto: string;
  cantidad: number;
}

export interface IConsultaCarrito {
  _id: string;
}
