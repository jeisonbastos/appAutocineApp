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

@NgModule({
  declarations: [
    PeliculaIndexComponent,
    PeliculaListComponent,
    PeliculaDetailComponent,
    PeliculaCreateComponent,
    ConvertToSpacesPipe,
  ],
  imports: [
    RouterModule.forChild([
      { path: 'peliculas', component: PeliculaIndexComponent },
      { path: 'peliculas/lista', component: PeliculaListComponent },
      { path: 'peliculas/registrar', component: PeliculaCreateComponent },
      {
        path: 'peliculas/:id',
        canActivate: [PeliculaDetailGuard],
        component: PeliculaDetailComponent,
      },
      // { path: '', }
    ]),
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class PeliculaModule {}
