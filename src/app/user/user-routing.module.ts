import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path: 'user/login', component: LoginComponent },
  { path: 'user/user-profile', component: UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule ]
})
export class UserRoutingModule { }
