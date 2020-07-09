import { Component, OnInit } from '@angular/core';

import { IMovie } from './movie';
import { MovieService } from './movie.service';
import '../../assets/js/custom.js'


@Component({
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css',
              '../../assets/css/style.css',]
})
export class MovieListComponent implements OnInit {
  pageTitle = 'Movies List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredMovies = this.listFilter ? this.performFilter(this.listFilter) : this.movies;
  }

  filteredMovies: IMovie[] = [];
  movies: IMovie[] = [];

  constructor(private movieService: MovieService) { }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Movie List: ' + message;
  }

  performFilter(filterBy: string): IMovie[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.movies.filter((movie: IMovie) =>
      movie.movieName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe({
      next: movies => {
        this.movies = movies;
        this.filteredMovies = this.movies;
      },
      error: err => this.errorMessage = err
    });
  }
}
