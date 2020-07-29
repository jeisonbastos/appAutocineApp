import { Component, OnInit } from '@angular/core';
import { GenericService } from 'src/app/shared/generic.service';
import { NotificacionService } from 'src/app/shared/notificacion.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IProducto } from '../producto';
import { IProductoTipo } from '../producto-tipo';
import { IProductoClasificacion } from '../producto-clasificacion';

@Component({
  templateUrl: './producto-index.component.html',
  styleUrls: [
    './producto-index.component.css',
    '../../../assets/css/style.css',
    '../../../assets/css/plugins.css',
  ],
})
export class ProductoIndexComponent implements OnInit {
  pageTitle = 'Productos Disponibles';
  imageWidth = 50;
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
  clasificaciones: IProductoClasificacion[] = [];
  tipo_producto: IProductoTipo;
  total_clasificaciones: number;

  constructor(
    private gService: GenericService,
    private notificacion: NotificacionService
  ) {}

  onRatingClicked(message: string): void {
    this.pageTitle = 'Lista de Películas Habilitadas: ' + message;
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
      .list('clasificacion producto/all')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (clasificacion: any) => {
          // console.log(productos);
          this.clasificaciones = clasificacion;
          this.total_clasificaciones = clasificacion.count();
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }
}
