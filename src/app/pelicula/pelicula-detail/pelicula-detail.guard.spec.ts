import { TestBed } from '@angular/core/testing';

import { PeliculaDetailGuard } from './pelicula-detail.guard';

describe('PeliculaDetailGuard', () => {
  let guard: PeliculaDetailGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PeliculaDetailGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
