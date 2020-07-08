import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
// import { JwtInterceptor, ErrorInterceptor } from '../_helpers';
// used to create fake backend
// import { fakeBackendProvider } from '../_helpers';
// import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserModule } from '../user/user.module';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, PageNotFoundComponent],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule, // modulo de animaciones requerido
    ToastrModule.forRoot(), // ToastrModule agregado
    UserModule
  ],

  exports: [HeaderComponent, FooterComponent],

})
export class CoreModule {}
