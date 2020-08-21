import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UbicacionIndexComponent } from './ubicacion-index/ubicacion-index.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { UbicacionRoutingModule } from './ubicacion-routing.module';

@NgModule({
  declarations: [
    UbicacionIndexComponent,
    //ConvertToSpacesPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    UbicacionRoutingModule,
  ],
})
export class UbicacionModule {}
