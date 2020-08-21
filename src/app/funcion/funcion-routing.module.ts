import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FuncionIndexComponent } from './funcion-index/funcion-index.component'

const routes: Routes = [
  { path: 'cartelera', component: FuncionIndexComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuncionRoutingModule {}
