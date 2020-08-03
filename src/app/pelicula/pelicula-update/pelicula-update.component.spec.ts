import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculaUpdateComponent } from './pelicula-update.component';

describe('PeliculaUpdateComponent', () => {
  let component: PeliculaUpdateComponent;
  let fixture: ComponentFixture<PeliculaUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PeliculaUpdateComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeliculaUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
