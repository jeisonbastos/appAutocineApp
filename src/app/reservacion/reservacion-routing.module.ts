import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductoDetailComponent } from './reservacion-detail/reservacion-detail.component';
import { ProductoListComponent } from './reservacion-list/reservacion-list.component';
import { ProductoIndexComponent } from './reservacion-index/reservacion-index.component'
import { ProductoCreateComponent } from './reservacion-create/reservacion-create.component'
import { ProductoUpdateComponent } from './reservacion-update/reservacion-update.component';

const routes: Routes = [
  { path: 'reservaciones', component: ProductoIndexComponent },
  { path: 'reservaciones/lista', component: ProductoListComponent },
  { path: 'reservaciones/detalle/:id', component: ProductoDetailComponent },
  { path: 'reservaciones/registrar', component: ProductoCreateComponent },
  { path: 'reservaciones/actualizar/:id', component: ProductoUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductoRoutingModule {}
