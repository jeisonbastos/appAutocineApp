import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { GenericService } from 'src/app/shared/generic.service';
import { NotificacionService } from 'src/app/shared/notificacion.service';
import { IProducto } from '../producto';
import { takeUntil } from 'rxjs/operators';

@Component({
  templateUrl: './producto-detail.component.html',
  styleUrls: ['./producto-detail.component.css',
    '../../../assets/css/style.css',
    '../../../assets/css/plugins.css',],
})
export class ProductoDetailComponent implements OnInit {
  pageTitle = 'Detalle del Producto';
  error = '';
  imageUrl = '';
  producto: IProducto = undefined;
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gService: GenericService,
    private notificacion: NotificacionService
  ) { }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getProducto(id);
    }
  }

  getProducto(id: number) {
    this.gService
      .get('producto', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (producto: any) => {
          this.producto = producto[0];
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }

  onBack(): void {
    this.router.navigate(['/productos']);
  }
}
