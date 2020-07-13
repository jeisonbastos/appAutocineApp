import { Component, OnInit } from '@angular/core';
import { GenericService } from 'src/app/shared/generic.service';
import { NotificacionService } from 'src/app/shared/notificacion.service';
import { Subject } from 'rxjs';
import { IPelicula } from '../pelicula';
import { PeliculaService } from '../pelicula.service';

@Component({
  templateUrl: './pelicula-list.component.html',
  styleUrls: ['../pelicula-list/pelicula-list.component.css'],
})
export class PeliculaListComponent implements OnInit {
  pageTitle = 'Lista de Películas';
  imageWidth = 50;
  imageMargin = 2;
  imageUrl = '';
  showImage = false;
  error = '';
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredpeliculas = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.peliculas;
  }

  filteredpeliculas: IPelicula[] = [];
  peliculas: IPelicula[] = [];

  constructor(private PeliculaService: PeliculaService) {}

  onRatingClicked(message: string): void {
    this.pageTitle = 'pelicula List: ' + message;
  }

  performFilter(filterBy: string): IPelicula[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.peliculas.filter(
      (pelicula: IPelicula) =>
        pelicula.nombre.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.PeliculaService.getPeliculas().subscribe({
      next: (peliculas) => {
        this.peliculas = peliculas;
        this.filteredpeliculas = this.peliculas;
      },
      error: (err) => (this.error = err),
    });
  }
}
