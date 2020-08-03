import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificacionService } from 'src/app/shared/notificacion.service';
import { GenericService } from 'src/app/shared/generic.service';
import { IClasificacion } from '../clasificacion';
import { IGenero } from '../genero';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';

@Component({
  templateUrl: './pelicula-update.component.html',
  styleUrls: [
    './pelicula-update.component.css',
    '../../../assets/css/style.css',
    '../../../assets/css/plugins.css',
  ],
})
export class PeliculaUpdateComponent implements OnInit {
  pageTitle = 'Actualizar Pelílcula';
  updateForm: FormGroup;
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
    private route: ActivatedRoute,
    private router: Router,
    private gService: GenericService,
    private notificacion: NotificacionService
  ) {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getPelicula(id);
    this.getGeneros();
    this.getClassificaciones();
  }

  getPelicula(id: number) {
    this.gService
      .get('pelicula', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (pelicula: any) => {
          this.pelicula = pelicula[0];
          this.reactiveForm();
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }

  get genders(): FormArray {
    return this.updateForm.get('genders') as FormArray;
  }
  get genders_id(): FormArray {
    return this.updateForm.get('genders_id') as FormArray;
  }

  reactiveForm() {
    if (this.pelicula) {
      this.updateForm = this.formBuilder.group({
        id: [this.pelicula.id, Validators.required],
        nombre: [this.pelicula.nombre, Validators.required],
        classification_id: [
          this.pelicula.classification_id,
          Validators.required,
        ],
        habilitada: [this.pelicula.habilitada, Validators.required],
        sinopsis: [this.pelicula.sinopsis, Validators.required],
        puntuacion: [this.pelicula.puntuacion, Validators.required],
        imagenURL: [this.pelicula.imagenURL, Validators.required],
        genders: this.formBuilder.array([]),
        genders_id: this.formBuilder.array([]),
      });
    }
  }

  ngOnInit(): void {}

  onReset() {
    this.reactiveForm();
  }

  onSubmit() {
    if (this.updateForm.invalid) {
      return;
    }
    console.log(this.updateForm.value);
    this.gService.update('pelicula', this.updateForm.value).subscribe(
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
          (this.generos = generos), this.setPeliculaCheckedGender();
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }

  getSelectClassificationDescr(event): void {
    this.clasificacion_descripcion = this.clasificaciones.find(
      (x) => x.id == event.target.value
    ).descripcion;
  }

  updateChkbxArray(id, isChecked, key) {
    const chkArray = <FormArray>this.updateForm.get(key);
    if (isChecked.target.checked) {
      chkArray.push(new FormControl(id));
    } else {
      let idx = chkArray.controls.findIndex((x) => x.value == id);
      chkArray.removeAt(idx);
    }
  }

  setPeliculaCheckedGender() {
    this.generos.forEach((x) => {
      let selected = false;
      if (this.pelicula.genders.find((i) => i.id == x.id)) {
        (this.updateForm.controls.genders as FormArray).push(
          new FormControl(x.id)
        );
        selected = true;
      }
      const control = new FormControl(selected);
      (this.updateForm.controls.genders_id as FormArray).push(control);
    });
  }
}
