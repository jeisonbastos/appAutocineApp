import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PeliculaListComponent } from './pelicula-list/pelicula-list.component';
import { PeliculaIndexComponent } from './pelicula-index/pelicula-index.component';
import { PeliculaDetailComponent } from './pelicula-detail/pelicula-detail.component';
import { PeliculaCreateComponent } from './pelicula-create/pelicula-create.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { RouterModule } from '@angular/router';
import { PeliculaDetailGuard } from './pelicula-detail/pelicula-detail.guard';
import { SharedModule } from '../shared/shared.module';
import { PeliculaUpdateComponent } from './pelicula-update/pelicula-update.component';
import { CommonModule } from '@angular/common';
import { PeliculaRoutingModule } from './pelicula-routing.module';

@NgModule({
  declarations: [
    PeliculaIndexComponent,
    PeliculaListComponent,
    PeliculaDetailComponent,
    PeliculaCreateComponent,
    PeliculaUpdateComponent,
    ConvertToSpacesPipe,
  ],
  imports: [
    // RouterModule.forChild([
    //   { path: 'peliculas', component: PeliculaIndexComponent },
    //   { path: 'peliculas/lista', component: PeliculaListComponent },
    //   { path: 'peliculas/registrar', component: PeliculaCreateComponent },
    //   {
    //     path: 'peliculas/:id',
    //     canActivate: [PeliculaDetailGuard],
    //     component: PeliculaDetailComponent,
    //   },
    //   {
    //     path: 'peliculas/actualizar/:id',
    //     canActivate: [PeliculaDetailGuard],
    //     component: PeliculaDetailComponent,
    //   },
    //   // { path: '', }
    // ]),
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    PeliculaRoutingModule,
  ],
})
export class PeliculaModule {}
