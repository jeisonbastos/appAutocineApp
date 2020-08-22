import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FuncionIndexComponent } from './funcion-index/funcion-index.component';
import { FuncionListComponent } from './funcion-list/funcion-list.component';
import { FuncionCreateComponent} from './funcion-create/funcion-create.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FuncionRoutingModule } from './funcion-routing.module';

@NgModule({
  declarations: [
    FuncionIndexComponent,
    FuncionListComponent,
    FuncionCreateComponent,
    //ConvertToSpacesPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    FuncionRoutingModule,
  ],
})
export class FuncionModule {}
