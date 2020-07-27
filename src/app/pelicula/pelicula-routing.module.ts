import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeliculaDetailComponent } from './pelicula-detail/pelicula-detail.component';
import { PeliculaListComponent } from './pelicula-list/pelicula-list.component';
import { PeliculaIndexComponent } from './pelicula-index/pelicula-index.component'
import { PeliculaCreateComponent } from './pelicula-create/pelicula-create.component'

const routes: Routes = [
  { path: 'peliculas', component: PeliculaIndexComponent },
  { path: 'peliculas/lista', component: PeliculaListComponent },
  { path: 'peliculas/detalle', component: PeliculaDetailComponent },
  { path: 'peliculas/registrar', component: PeliculaCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeliculaRoutingModule {}
