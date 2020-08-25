import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificacionService } from 'src/app/shared/notificacion.service';
import { GenericService } from 'src/app/shared/generic.service';
import { IProductoClasificacion } from '../producto-clasificacion';
import { IProductoTipo } from '../producto-tipo';
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
  templateUrl: './producto-create.component.html',
  styleUrls: [
    './producto-create.component.css',
    '../../../assets/css/style.css',
    '../../../assets/css/plugins.css',
  ],
})
export class ProductoCreateComponent implements OnInit {
  pageTitle = 'Agregar Nuevo Producto';
  createForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  producto: any;
  clasificaciones: IProductoClasificacion[] = [];
  tipo_descripcion = '';
  tipos: IProductoTipo[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private notificacion: NotificacionService
  ) {
    this.getProductoTipos();
    this.getClasificaciones();
    this.reactiveForm();
  }

  reactiveForm() {
    this.createForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      product_type_id: ['', [Validators.required, Validators.min(1)]],
      tamano_presentacion: [0, Validators.required],
      precio: [0, Validators.required],
      puntuacion: [0, [Validators.required, Validators.min(0)]],
      imagenURL: ['url', Validators.required],
      classifications: this.formBuilder.array(
        this.clasificaciones.map((x) => !1),
        [Validators.required]
      ),
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
    this.gService.create('producto', this.createForm.value).subscribe(
      (respuesta: any) => {
        (this.producto = respuesta), this.router.navigate(['productos/lista']);
      },
      (error: any) => {
        this.error = error;
        this.notificacion.msjValidacion(this.error);
      }
    );
  }

  onBack() {
    this.router.navigate(['/productos/lista']);
  }

  getClasificaciones() {
    this.gService
      .list('clasificacion producto/all')
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

  getProductoTipos(): void {
    this.gService
      .list('tipo producto/all')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (tipos: any) => {
          console.log(tipos);
          this.tipos = tipos;
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }

  getSelectTipoDescr(event): void {
    this.tipo_descripcion = this.tipos.find(
      (x) => x.id == event.target.value
    ).descripcion;
  }

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
