import { TestBed } from '@angular/core/testing';

import { ReservacionCreateGuard } from './reservacion-create.guard';

describe('ReservacionCreateGuard', () => {
  let guard: ReservacionCreateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ReservacionCreateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
