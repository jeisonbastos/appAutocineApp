import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionUpdateComponent } from './funcion-update.component';

describe('FuncionUpdateComponent', () => {
  let component: FuncionUpdateComponent;
  let fixture: ComponentFixture<FuncionUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FuncionUpdateComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncionUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
