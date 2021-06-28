import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IRespuestaServicio } from 'src/app/interfaces/generales';
import { IProducto } from 'src/app/interfaces/productos/productos.interface';
import { ProductoService } from 'src/app/servicios/producto/producto.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public productos: Array<IProducto> = [];
  public total:number = 0;
  public pagina: number = 1;
  public filtro = {
    limite: 10,
    salto: 0,
    busqueda: ''
  }
  constructor(
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {
    this.consultaProductos();
  }

  consultaProductos = () => {
    this.productoService.consultaProductos( this.filtro )
    .subscribe( ( respuesta: IRespuestaServicio ) => {
      console.log(respuesta)
      if ( respuesta.estatus ) {
        this.productos = respuesta.data.productos;
        this.total = respuesta.data.total;
      }
    }, ( error: HttpErrorResponse ) => {
      console.log( error )
    } )
  }

  cambiarPagina = ( pagina: number ) => {
    this.filtro.salto = (pagina - 1) * this.filtro.limite;

    this.consultaProductos();
  }

  buscarProducto = ( busqueda: string ) => {
    this.filtro.busqueda = busqueda;
    this.consultaProductos();
  }

}
