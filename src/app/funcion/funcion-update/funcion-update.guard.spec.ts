import { TestBed } from '@angular/core/testing';

import { FuncionUpdateGuard } from './funcion-update.guard';

describe('FuncionUpdateGuard', () => {
  let guard: FuncionUpdateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FuncionUpdateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
