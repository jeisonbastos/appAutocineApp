import { Component, OnInit } from '@angular/core';

import { GenericService } from 'src/app/shared/generic.service';
import { NotificacionService } from 'src/app/shared/notificacion.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IProducto } from '../producto';
import { IProductoTipo } from '../../producto/producto-tipo';
import { IProductoClasificacion } from '../producto-clasificacion';

@Component({
  templateUrl: './producto-list.component.html',
  styleUrls: [
    './producto-list.component.css',
    '../../../assets/css/style.css',
    '../../../assets/css/plugins.css',
  ],
})
export class ProductoListComponent implements OnInit {
  pageTitle = 'Lista de Productos';
  imageWidth = 100;
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
    this.filteredProductos = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.producto;
  }

  filteredProductos: IProducto[] = [];
  producto: IProducto[] = [];
  clasificacion: IProductoClasificacion[] = [];
  tipo_producto: IProductoTipo;
  total_clasificaciones: number;

  constructor(
    private gService: GenericService,
    private notificacion: NotificacionService
  ) {}

  onRatingClicked(message: string): void {
    this.pageTitle = 'Lista de Productos: ' + message;
  }

  performFilter(filterBy: string): IProducto[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.producto.filter(
      (producto: IProducto) =>
        producto.nombre.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.gService
      .list('producto/')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (productos: any) => {
          // console.log(productos);
          this.producto = productos;
          this.filteredProductos = this.producto;
          this.getClasifications();
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }

  getClasifications(): void {
    this.gService
      .list('clasificacion/all')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (clasificacion: any) => {
          // console.log(productos);
          this.clasificacion = clasificacion;
          this.total_clasificaciones = clasificacion.count();
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }
}
