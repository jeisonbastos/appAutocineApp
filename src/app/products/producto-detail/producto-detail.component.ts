import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IProducto } from '../producto';
import { ProductService } from '../producto.service';

@Component({
  templateUrl: './producto-detail.component.html',
  styleUrls: ['./producto-detail.component.css'],
})
export class ProductoDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  error = '';
  producto: IProducto | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getProduct(id);
    }
  }

  getProduct(id: number) {
    this.productService.getProduct(id).subscribe({
      next: (producto) => (this.producto = producto),
      error: (err) => (this.error = err),
    });
  }

  onBack(): void {
    this.router.navigate(['/producto']);
  }
}
