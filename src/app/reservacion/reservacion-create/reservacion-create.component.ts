import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificacionService } from 'src/app/shared/notificacion.service';
import { GenericService } from 'src/app/shared/generic.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { IProducto } from 'src/app/producto/producto';
import { ITiquete } from '../../tiquete/tiquete';
import { IPelicula } from 'src/app/pelicula/pelicula';
import { IProductoTipo } from 'src/app/producto/producto-tipo';
import { IFuncion } from 'src/app/funcion/funcion';
import { IUbicacion } from 'src/app/ubicaciones/ubicacion';
import { ITiqueteTipo } from 'src/app/tiquete/tiquete-tipo';
import { IReservacion } from '../reservacion';
import { stringify } from 'querystring';
import { newArray } from '@angular/compiler/src/util';

@Component({
  templateUrl: './reservacion-create.component.html',
  styleUrls: [
    './reservacion-create.component.css',
    '../../../assets/css/style.css',
    '../../../assets/css/plugins.css',
  ],
})
export class ReservacionCreateComponent implements OnInit {
  pageTitle = 'Seleccione Ubicacion';
  createForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  reservacion: any;
  provincias: string[];
  ubicacionFilter: string;
  ubicacionesHabilitada: string[];
  peliculas: IPelicula[] = [];
  filteredPeliculas: IPelicula[] = [];
  ubicaciones: IUbicacion[] = [];
  filteredUbicaciones: IUbicacion[] = [];
  funciones: IFuncion[] = [];
  tipo_tiquetes: ITiqueteTipo[] = [];
  tiquetes: ITiquete[] = [];
  tipo_productos: IProductoTipo[] = [];
  productos: IProducto[] = [];
  reservaciones: IReservacion[] = [];

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private notificacion: NotificacionService
  ) {
    this.getUbicaciones();
    this.getFunciones();
    this.getPeliculas();
    this.getTipoTiquetes();
    this.getTiquetes();
    this.getProductoTipos();
    this.getProductos();
    this.getReservaciones();
    this.reactiveForm();
    //this.getProvinciasFormControl();
  }

  reactiveForm() {
    this.createForm = this.formBuilder.group({
      user_id: ['', Validators.required],
      iva: 0,
      total: 0,
      tickets: this.formBuilder.array([], [Validators.required]),
      products: this.formBuilder.array([]),
      tiquetes: this.formBuilder.array(
        [this.tiquetes.map((x) => !1)],
        [Validators.required]
      ),
      productos: this.formBuilder.array(this.productos.map((x) => !1)),
      // provincias_form: this.formBuilder.array([]),
      provincia_filter: ['-1', Validators.min(1)],
      pelicula_id: ['', Validators.required],
      ubicaciones: this.formBuilder.array(this.ubicaciones.map((x) => !1)),
      ubicacion_seleccionda: ['', Validators.required],
    });
  }

  get listFilter(): string {
    return this.ubicacionFilter;
  }
  set listFilter(value: string) {
    this.ubicacionFilter = value;
    this.filteredUbicaciones = this.listFilter
      ? this.performUbicacionFilter(this.listFilter)
      : this.ubicaciones;
  }

  getProvinciasFormControl() {
    const prov = [
      'San José',
      'Alajuela',
      'Cartago',
      'Heredia',
      'Guanacaste',
      'Puntarenas',
      'Limón',
    ];
    prov.forEach((x) => {
      this.provincias.push(x);
    });
  }

  performUbicacionFilter(filterBy: string): IUbicacion[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.ubicaciones.filter(
      (ubicacion: IUbicacion) =>
        ubicacion.provincia.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
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
    this.gService.create('reservacion', this.createForm.value).subscribe(
      (respuesta: any) => {
        (this.reservacion = respuesta), this.router.navigate(['peliculas/']);
      },
      (error: any) => {
        this.error = error;
        this.notificacion.msjValidacion(this.error);
      }
    );
  }

  onBack() {
    this.router.navigate(['/peliculas']);
  }

  getUbicaciones() {
    this.gService
      .list('ubicacion')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          this.ubicaciones = data;
          data.array.forEach((x) => {
            this.ubicacionesHabilitada.push('enable');
          });
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }
  getFunciones() {
    this.gService
      .list('funcion/venta')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          this.funciones = data;
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }
  getPeliculas() {
    this.gService
      .list('pelicula')
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

  getTipoTiquetes() {
    this.gService
      .list('tipo tiquete/all')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          this.tipo_tiquetes = data;
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }

  getProductoTipos(): void {
    this.gService
      .list('tipo producto/all')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (tipo_productos: any) => {
          console.log(tipo_productos);
          this.tipo_productos = tipo_productos;
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }

  getTiquetes() {
    this.gService
      .list('tiquete/')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          this.tiquetes = data;
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }

  getProductos(): void {
    this.gService
      .list('tipo producto/all')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (productos: any) => {
          console.log(productos);
          this.productos = productos;
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }

  getReservaciones() {
    this.gService
      .list('reservacion/all')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          this.reservaciones = data;
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }
  // getSelectTipoDescr(event): void {
  //   this.tipo_productos = this.tiquetes.find(
  //     (x) => x.id == event.target.value
  //   ).ticket_type_id;
  // }

  updateChkbxArray(id, isChecked, key) {
    const chkArray = <FormArray>this.createForm.get(key);
    if (isChecked.target.checked) {
      if (chkArray.length == 0)
        chkArray.push(new FormControl(id));
      else
        isChecked.target.checked = false;
    } else {
      let idx = chkArray.controls.findIndex((x) => x.value == id);
      chkArray.removeAt(idx);
    }
  }

  disableChkbxs(idx, checked) {
    this.ubicacionesHabilitada.forEach((x) => {
      this.ubicacionesHabilitada[x] = checked ? 'disable' : 'enable';
      idx == x ? (this.ubicacionesHabilitada[x] = 'enable') : '';
    });
  }

  public errorHandling = (control: string, error: string) => {
    return this.createForm.controls[control].hasError(error);
  };
}
