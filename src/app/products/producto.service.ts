import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { IProducto } from './producto';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // If using Stackblitz, replace the url with this line
  // because Stackblitz can't find the api folder.
  private productUrl = 'assets/producto/producto.json';
  //private productUrl = '/api/producto/producto.json';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProducto[]> {
    return this.http.get<IProducto[]>(this.productUrl).pipe(
      tap((data) => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getProduct(id: number): Observable<IProducto | undefined> {
    return this.getProducts().pipe(
      map((producto: IProducto[]) => producto.find((p) => p.id === id))
    );
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let error = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      error = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      error = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(error);
    return throwError(error);
  }
}
