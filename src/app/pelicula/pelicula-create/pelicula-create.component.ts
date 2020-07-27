import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { NotificacionService } from 'src/app/shared/notificacion.service';
import { GenericService } from 'src/app/shared/generic.service';
import { IPelicula } from '../pelicula';
import { IClasificacion } from '../clasificacion';
import { IGenero } from '../genero';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './pelicula-create.component.html',
  styleUrls: [
    './pelicula-create.component.css',
    '../../../assets/css/style.css',
    '../../../assets/css/plugins.css',
  ],
})
export class PeliculaCreateComponent implements OnInit {
  pageTitle = 'Agregar Nueva Pelílcula';
  createForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  pelicula: any;
  clasificaciones: IClasificacion[] = [];
  generos: IGenero[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private notificacion: NotificacionService
  ) {
    this.reactiveForm();
    this.getClassificaciones();
    this.getGeneros();
  }

  reactiveForm() {
    this.createForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      classification: ['', Validators.required],
      habilitada: ['', Validators.required],
      genders: ['', Validators.required],
      sinopsis: ['', Validators.required],
      puntuacion: ['', Validators.required],
      imagenURL: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.createForm.invalid) {
      return;
    }
    console.log(this.createForm.value);
    this.gService.create('', this.createForm.value).subscribe(
      (respuesta: any) => {
        (this.pelicula = respuesta), this.router.navigate(['peliculas/']);
      },
      (error: any) => {
        this.error = error;
        this.notificacion.msjValidacion(this.error);
      }
    );
  }

  getClassificaciones() {
    this.gService
      .list('clasificacion/all')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          this.clasificaciones = data;
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }

  getGeneros(): void {
    this.gService
      .list('genero/all')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (generos: any) => {
          console.log(generos);
          this.generos = generos;
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }

  getSelectClassificationDescr(): void {
    // this.createForm.controls.
  }
}
