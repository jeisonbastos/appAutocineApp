import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { GenericService } from 'src/app/shared/generic.service';
import { NotificacionService } from 'src/app/shared/notificacion.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { IPelicula } from '../pelicula';
import { IClasificacion } from '../clasificacion';

@Component({
  templateUrl: './pelicula-list.component.html',
  styleUrls: ['./pelicula-list.component.css'],
})
export class PeliculaListComponent implements OnInit {
  pageTitle = 'Lista de Películas';
  imageWidth = 50;
  imageMargin = 2;
  imageUrl = '';
  showImage = true;
  error: any;
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
  clasificacion: IClasificacion;
  clasificacion_siglas: '';

  constructor(
    private gService: GenericService,
    private notificacion: NotificacionService
  ) {}

  onRatingClicked(message: string): void {
    this.pageTitle = 'Lista de Peliculas: ' + message;
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
    this.gService
      .list('pelicula/all')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (peliculas: any) => {
          console.log(peliculas);
          this.peliculas = peliculas;
          this.filteredpeliculas = this.peliculas;
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }
}
