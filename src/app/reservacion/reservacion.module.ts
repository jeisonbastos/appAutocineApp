import { NgModule } from '@angular/core';
// import { ReservacionIndexComponent } from '../reservacion/reservacion-index/reservacion-index.component';
// import { ReservacionListComponent } from '../reservacion/reservacion-list/reservacion-list.component';
// import { ReservacionDetailComponent } from '../reservacion/reservacion-detail/reservacion-detail.component';
 import { ReservacionCreateComponent } from '../reservacion/reservacion-create/reservacion-create.component';
// import { ReservacionUpdateComponent } from '../reservacion/reservacion-update/reservacion-update.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { RouterModule } from '@angular/router';
// import { ProductDetailGuard } from '../reservacion/reservacion-detail/reservacion-detail.guard';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ReservacionRoutingModule } from './reservacion-routing.module';

@NgModule({
  declarations: [
    // ReservacionIndexComponent,
    // ReservacionListComponent,
    // ReservacionDetailComponent,
    ReservacionCreateComponent,
    // ReservacionUpdateComponent,

    //ConvertToSpacesPipe,
  ],
  imports: [
    // RouterModule.forChild([
    //   {
    //     path: 'reservacions/:id',
    //     canActivate: [ProductDetailGuard],
    //     component: ReservacionDetailComponent,
    //   },
    // ]),
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    ReservacionRoutingModule,
  ],
})
export class ReservacionModule {}
