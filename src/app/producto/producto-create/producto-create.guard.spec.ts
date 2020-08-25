import { TestBed } from '@angular/core/testing';

import { ProductoCreateGuard } from './producto-create.guard';

describe('ProductoCreateGuard', () => {
  let guard: ProductoCreateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProductoCreateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
