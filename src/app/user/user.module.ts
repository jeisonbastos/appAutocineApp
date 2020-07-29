import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [LoginComponent, UserProfileComponent],
  imports: [CommonModule, ReactiveFormsModule, UserRoutingModule],
  exports: [UserRoutingModule],
})
export class UserModule {}
