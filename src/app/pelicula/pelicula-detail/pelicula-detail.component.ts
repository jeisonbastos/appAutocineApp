import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { GenericService } from 'src/app/shared/generic.service';
import { NotificacionService } from 'src/app/shared/notificacion.service';
import { IPelicula } from '../pelicula';
import { PeliculaService } from '../pelicula.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  templateUrl: './pelicula-detail.component.html',
  styleUrls: ['./pelicula-detail.component.css'],
})
export class PeliculaDetailComponent implements OnInit {
  pageTitle = 'Detalle de la Pelilcula';
  error = '';
  imageUrl = '';
  pelicula: IPelicula = undefined;
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gService: GenericService,
    private notificacion: NotificacionService
  ) {}

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getPelicula(id);
    }
  }

  getPelicula(id: number) {
    this.gService
      .get('pelicula', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (pelicula: any) => {
          this.pelicula = pelicula[0];
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }

  onBack(): void {
    this.router.navigate(['/peliculas']);
  }
}
