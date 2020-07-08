import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
// import { JwtInterceptor, ErrorInterceptor } from './_helpers';
// // used to create fake backend
// import { fakeBackendProvider } from './_helpers';
import { ProductModule } from './products/product.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    // importar HttpClientModule después BrowserModule.
    // comunicarse con un servidor a través del protocolo HTTP
    HttpClientModule,
    // importar otras dependencias que sean necesario cargar en el componente principal.

    // importar los módulos creados propios en orden
    CoreModule,
    SharedModule,
    // después los demás módulos
    HomeModule,
    UserModule,
    ProductModule,

    // al final el gestor de las rutas principal
    AppRoutingModule,
  ],

  // providers: [
  //   { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  //   { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  //   // provider used to create fake backend
  //   fakeBackendProvider,
  // ],
  bootstrap: [AppComponent],
})
export class AppModule {}
