import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { UserRoutingModule } from '../user/user-routing.module';


@NgModule({
  declarations: [InicioComponent],
  imports: [CommonModule, HomeRoutingModule, UserRoutingModule],
  exports: [InicioComponent],
})
export class HomeModule {}
