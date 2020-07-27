import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculaCreateComponent } from './pelicula-create.component';

describe('PeliculaCreateComponent', () => {
  let component: PeliculaCreateComponent;
  let fixture: ComponentFixture<PeliculaCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PeliculaCreateComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeliculaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
