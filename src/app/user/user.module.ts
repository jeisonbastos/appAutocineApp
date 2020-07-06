import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from '../_helpers';
import { JwtInterceptor, ErrorInterceptor } from '../_helpers';
import { LoginComponent } from './login';
import { UserProfileComponent } from './user-profile/user-profile.component';
// import { HomeModule } from '../home/home.module';

@NgModule({
  declarations: [LoginComponent, UserProfileComponent],
  imports: [CommonModule, UserRoutingModule, ],
  exports: [UserRoutingModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider,
  ],
})
export class UserModule {}
