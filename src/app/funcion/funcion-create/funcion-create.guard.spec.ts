import { TestBed } from '@angular/core/testing';

import { PeliculaCreateGuard } from './funcion-create.guard';

describe('PeliculaCreateGuard', () => {
  let guard: PeliculaCreateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PeliculaCreateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
