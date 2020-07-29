import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { ProductoModule } from './products/producto.module';
import { PeliculaModule } from './pelicula/pelicula.module';

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
    ProductoModule,
    PeliculaModule,

    // al final el gestor de las rutas principal
    AppRoutingModule,
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
