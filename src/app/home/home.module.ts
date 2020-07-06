import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HomeRoutingModule } from './home-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { UserModule } from '../user/user.module';
import { UserRoutingModule } from '../user/user-routing.module';
import { JwtInterceptor, ErrorInterceptor } from '../_helpers';
// used to create fake backend
import { fakeBackendProvider } from '../_helpers';

@NgModule({
  declarations: [InicioComponent],
  imports: [CommonModule, HomeRoutingModule],
  exports: [InicioComponent],

})
export class HomeModule {}
