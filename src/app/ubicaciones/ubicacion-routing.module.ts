import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UbicacionIndexComponent } from './ubicacion-index/ubicacion-index.component'

const routes: Routes = [
  { path: 'ubicaciones', component: UbicacionIndexComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UbicacionRoutingModule {}
