import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificacionService } from 'src/app/shared/notificacion.service';
import { GenericService } from 'src/app/shared/generic.service';
import { IClasificacion } from '../clasificacion';
import { IGenero } from '../genero';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

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
  clasificacion_descripcion = '';
  generos: IGenero[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private notificacion: NotificacionService,
  ) {
    this.getClassificaciones();
    this.getGeneros();
    this.reactiveForm();
  }

  reactiveForm() {
    this.createForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      classification_id: ['', Validators.required],
      habilitada: [false, Validators.required],
      genders: this.formBuilder.array(this.generos.map(x => !1)),
      sinopsis: ['', Validators.required],
      puntuacion: [0, Validators.required],
      imagenURL: ['url', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onReset() {
    this.reactiveForm();
  }

  onSubmit() {
    if (this.createForm.invalid) {
      return;
    }
    console.log(this.createForm.value);
    this.gService.create('pelicula', this.createForm.value).subscribe(
      (respuesta: any) => {
        (this.pelicula = respuesta), this.router.navigate(['peliculas/lista']);
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

  getSelectClassificationDescr(event): void {
    this.clasificacion_descripcion = this.clasificaciones.find(x => x.id == event.target.value ).descripcion;
  }

  updateChkbxArray(id, isChecked, key) {
    const chkArray = <FormArray>this.createForm.get(key);
    if (isChecked.target.checked) {
      chkArray.push(new FormControl(id));
    } else {
      let idx = chkArray.controls.findIndex(x => x.value == id);
      chkArray.removeAt(idx);
    }
  }
}
