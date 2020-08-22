import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FuncionIndexComponent } from './funcion-index/funcion-index.component';
import { FuncionListComponent } from './funcion-list/funcion-list.component';
import { FuncionCreateComponent} from './funcion-create/funcion-create.component';

const routes: Routes = [
  { path: 'cartelera', component: FuncionIndexComponent },
  { path: 'funciones', component: FuncionListComponent },
  { path: 'funciones/registrar', component: FuncionCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuncionRoutingModule {}
