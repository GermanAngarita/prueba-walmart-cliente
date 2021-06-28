import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SESSION_STORAGE } from 'src/app/enum/session_storage-tipos';
import { IRespuestaServicio } from 'src/app/interfaces/generales';
import { IProducto } from 'src/app/interfaces/productos/productos.interface';
import { CarritoService } from 'src/app/servicios/carrito/carrito.service';
import { ModalCarritoComponent } from '../modal-carrito/modal-carrito.component';

@Component({
  selector: 'app-tarjeta-producto',
  templateUrl: './tarjeta-producto.component.html',
  styleUrls: ['./tarjeta-producto.component.css']
})
export class TarjetaProductoComponent implements OnInit {

  @Input() producto: IProducto;

  constructor( 
    private carritoService: CarritoService,
    private modalService: NgbModal
     ) {
    this.producto = {
      id: 0,
      brand: '',
      description: '',
      image: '',
      price: 0
    }
  }

  ngOnInit(): void {
  }

  abrirCarrito = () => {
    this.modalService.open( ModalCarritoComponent, {
      size: 'lg'
    })
  }

  agregarProducto = () => {

    const idCarrito = sessionStorage.getItem( SESSION_STORAGE.CARRITO )

    console.log('idCarrito: ', idCarrito );

    this.carritoService.agregarProducto({
      idCarrito: idCarrito?.toString() ? idCarrito?.toString() : '',
      idProducto: this.producto._id ? this.producto._id: '',
      cantidad: 1,
    }).subscribe( ( respuesta: IRespuestaServicio ) => {
      this.abrirCarrito();
    }, ( error: HttpErrorResponse ) => {
      console.error('Error: ', error );
    } )
  }

}
