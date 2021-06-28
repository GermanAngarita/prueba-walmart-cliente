import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraNavegacionComponent } from './barra-navegacion/barra-navegacion.component';
import { ModalCarritoComponent } from './modal-carrito/modal-carrito.component';
import { RouterModule } from '@angular/router';
import { TarjetaProductoComponent } from './tarjeta-producto/tarjeta-producto.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BarraNavegacionComponent,
    ModalCarritoComponent,
    TarjetaProductoComponent
  ],
  exports: [
    BarraNavegacionComponent,
    ModalCarritoComponent,
    TarjetaProductoComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ]
})
export class ComponentesModule { }
