import { NgModule } from '@angular/core';
import { PeliculaListComponent } from './pelicula-list/pelicula-list.component';
import { PeliculaIndexComponent } from './pelicula-index/pelicula-index.component';
import { PeliculaDetailComponent } from './pelicula-detail/pelicula-detail.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { RouterModule } from '@angular/router';
import { PeliculaDetailGuard } from './pelicula-detail/pelicula-detail.guard';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PeliculaIndexComponent,
    PeliculaListComponent,
    PeliculaDetailComponent,
    ConvertToSpacesPipe,
  ],
  imports: [
    RouterModule.forChild([
      { path: 'peliculas', component: PeliculaIndexComponent },
      { path: 'peliculas/lista', component: PeliculaListComponent },
      {
        path: 'peliculas/:id',
        canActivate: [PeliculaDetailGuard],
        component: PeliculaDetailComponent,
      },
      // { path: '', }
    ]),
    SharedModule,
  ],
})
export class PeliculaModule {}
