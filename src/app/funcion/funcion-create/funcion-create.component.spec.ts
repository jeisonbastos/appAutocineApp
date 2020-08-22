import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionCreateComponent } from './funcion-create.component';

describe('FuncionCreateComponent', () => {
  let component: FuncionCreateComponent;
  let fixture: ComponentFixture<FuncionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FuncionCreateComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
