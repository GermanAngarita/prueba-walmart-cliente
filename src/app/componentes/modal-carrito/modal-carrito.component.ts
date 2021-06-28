import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SESSION_STORAGE } from 'src/app/enum/session_storage-tipos';
import { EICarritoConProductos, ICarritoConProductos } from 'src/app/interfaces/carrito';
import { IRespuestaServicio } from 'src/app/interfaces/generales';
import { CarritoService } from 'src/app/servicios/carrito/carrito.service';

@Component({
  selector: 'app-modal-carrito',
  templateUrl: './modal-carrito.component.html',
  styleUrls: ['./modal-carrito.component.css']
})
export class ModalCarritoComponent implements OnInit {

  public carrito: ICarritoConProductos;
  public idCarrito: any;
  constructor( 
    public modalActivo: NgbActiveModal,
    private carritoService: CarritoService
    ) {
      this.carrito = Object.assign( {}, EICarritoConProductos );
      this.idCarrito = sessionStorage.getItem( SESSION_STORAGE.CARRITO )
      this.consultaCarrito();
    }

  ngOnInit(): void {

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

  eliminarProducto = ( idProducto: any, cantidad: number ) => {
    this.carritoService.eliminarProducto({
      idCarrito: this.idCarrito,
      idProducto: idProducto,
      cantidad: cantidad
    })
    .subscribe( ( respuesta: IRespuestaServicio ) => {
      if ( respuesta.estatus ) {
        this.consultaCarrito();
      } else {
        //Emitir mensaje.
      }
    }, ( error: HttpErrorResponse ) => {
        this.consultaCarrito();
    } )
  }

}
