import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IPelicula } from './pelicula';

@Injectable({
  providedIn: 'root',
})
export class PeliculaService {
  // If using Stackblitz, replace the url with this line
  // because Stackblitz can't find the api folder.
  private peliculaUrl = environment.apiURL;
  //private peliculaUrl = '/api/peliculas/peliculas.json';

  constructor(private http: HttpClient) {}

  getPeliculas(): Observable<IPelicula[]> {
    return this.http.get<IPelicula[]>(this.peliculaUrl).pipe(
      tap((data) => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getPelicula(id: number): Observable<IPelicula | undefined> {
    return this.getPeliculas().pipe(
      map((peliculas: IPelicula[]) => peliculas.find((p) => p.id === id))
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
