import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SESSION_STORAGE } from 'src/app/enum/session_storage-tipos';
import { EICarrito, ICarrito } from 'src/app/interfaces/carrito';
import { IRespuestaServicio } from 'src/app/interfaces/generales';
import { CarritoService } from 'src/app/servicios/carrito/carrito.service';
import { ModalCarritoComponent } from '../modal-carrito/modal-carrito.component';

@Component({
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.css']
})
export class BarraNavegacionComponent implements OnInit {

  public buscador: string;
  public idCarrito: any;
  public carrito: ICarrito;
  @Output() busqueda: EventEmitter<string> = new EventEmitter();
  constructor(
    private carritoService: CarritoService,
    private modalService: NgbModal
  ) {
    this.buscador = '';
    this.carrito = Object.assign( {}, EICarrito );

    if ( sessionStorage.getItem( SESSION_STORAGE.CARRITO ) ) {

      this.idCarrito = sessionStorage.getItem( SESSION_STORAGE.CARRITO )
      // Consultar carrito

      console.log('idCarrito', this.idCarrito );

      this.consultaCarrito();
    } else {
      this.crearCarrito();
    }
    
    
  }

  ngOnInit(): void {
  }

  crearCarrito = () => {
    this.carritoService.crearCarrito()
    .subscribe( ( respuesta: IRespuestaServicio ) => {
      if ( respuesta.estatus ) {
        sessionStorage.setItem(SESSION_STORAGE.CARRITO, respuesta.data.carrito._id );
        this.carrito = respuesta.data.carrito;
      } else {
        //Emitir mensaje.
      }
    }, ( error: HttpErrorResponse ) => {
        //Emitir mensaje.
    } )
  }

  consultaCarrito = () => {
    this.carritoService.consultaCarrito({ _id: this.idCarrito })
    .subscribe( ( respuesta: IRespuestaServicio ) => {
      if ( respuesta.estatus ) {
        this.carrito = respuesta.data.carrito;
        console.log('consultaCarrito: ', respuesta)
      } else {
        //Emitir mensaje.
      }
    }, ( error: HttpErrorResponse ) => {
        //Emitir mensaje.
    } )
  }

  buscar = () => {
    console.log('emitido')
    this.busqueda.emit( this.buscador );
  }

  verCarrito = () => {
    this.modalService.open( ModalCarritoComponent, {
      size: 'lg'
    })
  }

}
