import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { AcercaDeComponent } from './acerca-de/acerca-de.component';
// import { AuthGuard } from '../_helpers';
import { LoginComponent } from '../user/login';
import { UserRoutingModule } from '../user/user-routing.module';

const routes: Routes = [
  { path: 'home', component: InicioComponent },
  { path: 'home/acercade', component: AcercaDeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes), UserRoutingModule],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
