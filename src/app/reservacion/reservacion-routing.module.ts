import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { ReservacionDetailComponent } from './reservacion-detail/reservacion-detail.component';
// import { ReservacionListComponent } from './reservacion-list/reservacion-list.component';
// import { ReservacionIndexComponent } from './reservacion-index/reservacion-index.component'
import { ReservacionCreateComponent } from './reservacion-create/reservacion-create.component'
// import { ReservacionUpdateComponent } from './reservacion-update/reservacion-update.component';

const routes: Routes = [
  // { path: 'reservaciones', component: ReservacionIndexComponent },
  // { path: 'reservaciones/lista', component: ReservacionListComponent },
  // { path: 'reservaciones/detalle/:id', component: ReservacionDetailComponent },
  { path: 'reservaciones/registrar', component: ReservacionCreateComponent },
  // { path: 'reservaciones/actualizar/:id', component: ReservacionUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservacionRoutingModule {}
