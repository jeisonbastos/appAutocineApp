import { NgModule } from '@angular/core';
import { ProductoIndexComponent } from './producto-index/producto-index.component';
import { ProductoListComponent } from './producto-list/producto-list.component';
import { ProductoDetailComponent } from './producto-detail/producto-detail.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from './producto-detail/producto-detail.guard';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ProductoIndexComponent,
    ProductoListComponent,
    ProductoDetailComponent,
    //ConvertToSpacesPipe,
  ],
  imports: [
    RouterModule.forChild([
      { path: 'producto', component: ProductoIndexComponent },
      { path: 'producto/lista', component: ProductoListComponent },
      {
        path: 'producto/:id',
        canActivate: [ProductDetailGuard],
        component: ProductoDetailComponent,
      },
    ]),
    SharedModule,
  ],
})
export class ProductoModule {}
