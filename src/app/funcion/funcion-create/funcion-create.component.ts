import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificacionService } from 'src/app/shared/notificacion.service';
import { GenericService } from 'src/app/shared/generic.service';
import { IPelicula } from 'src/app/pelicula/pelicula';
import { IUbicacion } from 'src/app/ubicaciones/ubicacion';
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
  templateUrl: './funcion-create.component.html',
  styleUrls: [
    './funcion-create.component.css',
    '../../../assets/css/style.css',
    '../../../assets/css/plugins.css',
  ],
})
export class FuncionCreateComponent implements OnInit {
  pageTitle = 'Agregar Nueva Función';
  createForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  funcion: any;
  peliculas: IPelicula[] = [];
  clasificacion_descripcion = '';
  ubicaciones: IUbicacion[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private notificacion: NotificacionService
  ) {
    this.getPeliculas();
    this.getUbicaciones();
    this.reactiveForm();
  }

  reactiveForm() {
    this.createForm = this.formBuilder.group({
      fecha: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      movie_id: ['', [Validators.required, Validators.min(1)]],
      location_id: ['', [Validators.required, Validators.min(1)]],
      visible_cartelera: [false, Validators.required],
      disponible_venta: [false, Validators.required],
      cantidad_espacios: [0, [Validators.required, Validators.min(0)]],
      // movie: this.formBuilder.array(
      //   this.peliculas.map((x) => !1),
      //   [Validators.required]
      // ),
      // locations: this.formBuilder.array(
      //   this.ubicaciones.map((x) => !1),
      //   [Validators.required]
      // ),
    });
  }

  ngOnInit(): void {}

  onReset() {
    this.createForm.reset();
  }

  onSubmit() {
    if (this.createForm.invalid) {
      return;
    }
    console.log(this.createForm.value);
    this.gService.create('funcion', this.createForm.value).subscribe(
      (respuesta: any) => {
        (this.funcion = respuesta), this.router.navigate(['funciones']);
      },
      (error: any) => {
        this.error = error;
        this.notificacion.msjValidacion(this.error);
      }
    );
  }

  onBack() {
    this.router.navigate(['/funciones']);
  }

  getPeliculas() {
    this.gService
      .list('pelicula/all')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          this.peliculas = data;
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }

  getUbicaciones(): void {
    this.gService
      .list('ubicacion')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (ubicaciones: any) => {
          console.log(ubicaciones);
          this.ubicaciones = ubicaciones;
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }

  // getSelectClassificationDescr(event): void {
  //   this.clasificacion_descripcion = this.peliculas.find(x => x.id == event.target.value ).descripcion;
  // }

  updateChkbxArray(id, isChecked, key) {
    const chkArray = <FormArray>this.createForm.get(key);
    if (isChecked.target.checked) {
      chkArray.push(new FormControl(id));
    } else {
      let idx = chkArray.controls.findIndex((x) => x.value == id);
      chkArray.removeAt(idx);
    }
  }

  public errorHandling = (control: string, error: string) => {
    return this.createForm.controls[control].hasError(error);
  };
}
