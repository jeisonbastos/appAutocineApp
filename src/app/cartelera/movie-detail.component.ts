import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IMovie } from './movie';
import { MovieService } from './movie.service';

@Component({
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  pageTitle = 'Movie Detail';
  errorMessage = '';
  movie: IMovie | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private movieService: MovieService) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getMovie(id);
    }
  }

  getMovie(id: number) {
    this.movieService.getMovie(id).subscribe({
      next: movie => this.movie = movie,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/movies']);
  }
}
