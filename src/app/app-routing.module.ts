import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './home/inicio/inicio.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { LoginComponent } from './user/login/login.component'
import { AuthGuard } from './_helpers';
import { UserModule } from './user/user.module';

const routes: Routes = [
  { path: 'home', component: InicioComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'user/login', component: LoginComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule, ],

  declarations: [],
})
export class AppRoutingModule {}
