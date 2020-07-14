import { Component, OnInit } from '@angular/core';

import { IProducto } from '../producto';
import { ProductService } from '../producto.service'

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  error = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.producto;
  }

  filteredProducts: IProducto[] = [];
  producto: IProducto[] = [];

  constructor(private productService: ProductService) {}

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
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
    this.productService.getProducts().subscribe({
      next: (producto) => {
        this.producto = producto;
        this.filteredProducts = this.producto;
      },
      error: (err) => (this.error = err),
    });
  }
}
