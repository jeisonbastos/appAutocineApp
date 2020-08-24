import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  templateUrl: './funcion-update.component.html',
  styleUrls: [
    './funcion-update.component.css',
    '../../../assets/css/style.css',
    '../../../assets/css/plugins.css',
  ],
})
export class FuncionUpdateComponent implements OnInit {
  pageTitle = 'Actualizar Función';
  updateForm: FormGroup;
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
    private route: ActivatedRoute,
    private router: Router,
    private gService: GenericService,
    private notificacion: NotificacionService
  ) {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getFuncion(id);
    this.getPeliculas();
    this.getUbicaciones();
  }

  getFuncion(id: number) {
    this.gService
      .get('funcion', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (funcion: any) => {
          this.funcion = funcion[0];
          this.reactiveForm();
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }

  reactiveForm() {
    if(this.funcion){
    this.updateForm = this.formBuilder.group({
      id: [this.funcion.id, Validators.required],
      fecha: [this.funcion.fecha, [Validators.required]],
      hora: [this.funcion.hora, [Validators.required]],
      movie_id: [this.funcion.movie_id, [Validators.required, Validators.min(1)]],
      location_id: [this.funcion.location_id, [Validators.required, Validators.min(1)]],
      visible_cartelera: [this.funcion.visible_cartelera, Validators.required],
      disponible_venta: [this.funcion.disponible_venta, Validators.required],
      cantidad_espacios: [this.funcion.cantidad_espacios, [Validators.required, Validators.min(0)]],
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
  }

  ngOnInit(): void {}

  onReset() {
    this.updateForm.reset();
  }

  onSubmit() {
    if (this.updateForm.invalid) {
      return;
    }
    console.log(this.updateForm.value);
    this.gService.update('funcion', this.updateForm.value).subscribe(
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

  updateChkbxArray(id, isChecked, key) {
    const chkArray = <FormArray>this.updateForm.get(key);
    if (isChecked.target.checked) {
      chkArray.push(new FormControl(id));
    } else {
      let idx = chkArray.controls.findIndex((x) => x.value == id);
      chkArray.removeAt(idx);
    }
  }

  public errorHandling = (control: string, error: string) => {
    return this.updateForm.controls[control].hasError(error);
  };
}
