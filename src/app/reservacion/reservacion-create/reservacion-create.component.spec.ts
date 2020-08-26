import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservacionCreateComponent } from './reservacion-create.component';

describe('ReservacionCreateComponent', () => {
  let component: ReservacionCreateComponent;
  let fixture: ComponentFixture<ReservacionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReservacionCreateComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservacionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
