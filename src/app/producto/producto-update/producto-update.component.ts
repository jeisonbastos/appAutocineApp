import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  templateUrl: './producto-update.component.html',
  styleUrls: [
    './producto-update.component.css',
    '../../../assets/css/style.css',
    '../../../assets/css/plugins.css',
  ],
})
export class ProductoUpdateComponent implements OnInit {
  pageTitle = 'Actualizar Producto';
  updateForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  producto: any;
  clasificaciones: IProductoClasificacion[] = [];
  tipo_descripcion = '';
  producto_tipos: IProductoTipo[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private gService: GenericService,
    private notificacion: NotificacionService
  ) {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getProducto(id);
    this.getProductoTipos();
    this.getClassificaciones();
  }

  getProducto(id: number) {
    this.gService
      .get('producto', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (producto: any) => {
          this.producto = producto[0];
          this.reactiveForm();
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }

  get classifications(): FormArray {
    return this.updateForm.get('classifications') as FormArray;
  }
  get classifications_id(): FormArray {
    return this.updateForm.get('classifications_id') as FormArray;
  }

  reactiveForm() {
    if (this.producto) {
      this.updateForm = this.formBuilder.group({
        id: [this.producto.id, Validators.required],
        nombre: [this.producto.nombre, Validators.required],
        descripcion: [this.producto.descripcion, Validators.required],
        product_type_id: [
          this.producto.product_type_id,
          [Validators.required, Validators.min(1)],
        ],
        tamano_presentacion: [
          this.producto.tamano_presentacion,
          Validators.required,
        ],
        precio: [this.producto.precio, Validators.required],
        puntuacion: [
          this.producto.puntuacion,
          [
            Validators.required,
            Validators.pattern('^[0-9]*.[0-9]{2}$'),
            Validators.min(0),
          ],
        ],
        imagenURL: [this.producto.imagenURL, Validators.required],
        classifications: this.formBuilder.array(
          [],
          [Validators.required, Validators.minLength(1)]
        ),
        classifications_id: this.formBuilder.array([]),
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
    this.gService.update('producto', this.updateForm.value).subscribe(
      (respuesta: any) => {
        (this.producto = respuesta), this.router.navigate(['productos/lista']);
      },
      (error: any) => {
        this.error = error;
        this.notificacion.msjValidacion(this.error);
      }
    );
  }

  getClassificaciones() {
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
        (producto_tipos: any) => {
          console.log(producto_tipos);
          (this.producto_tipos = producto_tipos),
            this.setProductoCheckedClassification();
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }

  getSelectTipoDescr(event): void {
    this.tipo_descripcion = this.producto_tipos.find(
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

  setProductoCheckedClassification() {
    this.producto_tipos.forEach((x) => {
      let selected = false;
      if (this.producto.classifications.find((i) => i.id == x.id)) {
        (this.updateForm.controls.classifications as FormArray).push(
          new FormControl(x.id)
        );
        selected = true;
      }
      const control = new FormControl(selected);
      (this.updateForm.controls.classifications_id as FormArray).push(control);
    });
  }

  public errorHandling = (control: string, error: string) => {
    return this.updateForm.controls[control].hasError(error);
  };
}
