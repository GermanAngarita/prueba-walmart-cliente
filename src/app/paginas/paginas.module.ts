import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { ComponentesModule } from '../componentes/componentes.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    InicioComponent
  ],
  exports:[
    InicioComponent
  ],
  imports: [
    CommonModule,
    ComponentesModule,
    NgbModule
  ]
})
export class PaginasModule { }
