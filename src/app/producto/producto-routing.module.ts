import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductoDetailComponent } from './producto-detail/producto-detail.component';
import { ProductoListComponent } from './producto-list/producto-list.component';
import { ProductoIndexComponent } from './producto-index/producto-index.component'
import { ProductoCreateComponent } from './producto-create/producto-create.component'
import { ProductoUpdateComponent } from './producto-update/producto-update.component';

const routes: Routes = [
  { path: 'productos', component: ProductoIndexComponent },
  { path: 'productos/lista', component: ProductoListComponent },
  { path: 'productos/detalle/:id', component: ProductoDetailComponent },
  { path: 'productos/registrar', component: ProductoCreateComponent },
  { path: 'productos/actualizar/:id', component: ProductoUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductoRoutingModule {}
