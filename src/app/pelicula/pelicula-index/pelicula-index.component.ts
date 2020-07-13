import { Component, OnInit } from '@angular/core';
import { GenericService } from 'src/app/shared/generic.service';
import { NotificacionService } from 'src/app/shared/notificacion.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IPelicula } from '../pelicula';
import { IClasificacion } from '../clasificacion';
import { IGenero } from '../genero';

@Component({
  templateUrl: './pelicula-index.component.html',
  styleUrls: ['./pelicula-index.component.css'],
})
export class PeliculaIndexComponent implements OnInit {
  pageTitle = 'Lista de Películas Habilitadas';
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
  generos: IGenero[] = [];
  total_generos: number; 
  clasificacion_siglas: '';

  constructor(
    private gService: GenericService,
    private notificacion: NotificacionService
  ) {}

  onRatingClicked(message: string): void {
    this.pageTitle = 'Lista de Películas Habilitadas: ' + message;
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
      .list('pelicula/')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (peliculas: any) => {
          // console.log(peliculas);
          this.peliculas = peliculas;
          this.filteredpeliculas = this.peliculas;
          //this.getGenders();
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }

  getGenders(): void {
    this.gService
      .list('genero/all')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (generos: any) => {
          // console.log(peliculas);
          this.generos = generos;
          this.total_generos = generos.count();
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }
}
