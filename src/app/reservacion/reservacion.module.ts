import { NgModule } from '@angular/core';
import { ProductoIndexComponent } from '../producto/producto-index/producto-index.component';
import { ProductoListComponent } from '../producto/producto-list/producto-list.component';
import { ProductoDetailComponent } from '../producto/producto-detail/producto-detail.component';
import { ProductoCreateComponent } from '../producto/producto-create/producto-create.component';
import { ProductoUpdateComponent } from '../producto/producto-update/producto-update.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from '../producto/producto-detail/producto-detail.guard';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductoRoutingModule } from './reservacion-routing.module';

@NgModule({
  declarations: [
    ProductoIndexComponent,
    ProductoListComponent,
    ProductoDetailComponent,
    ProductoCreateComponent,
    ProductoUpdateComponent,

    //ConvertToSpacesPipe,
  ],
  imports: [
    // RouterModule.forChild([
    //   {
    //     path: 'productos/:id',
    //     canActivate: [ProductDetailGuard],
    //     component: ProductoDetailComponent,
    //   },
    // ]),
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    ProductoRoutingModule,
  ],
})
export class ProductoModule {}
