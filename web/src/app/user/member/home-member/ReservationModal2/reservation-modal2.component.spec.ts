import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationModal2Component } from './reservation-modal2.component';

describe('ReservationModal2Component', () => {
  let component: ReservationModal2Component;
  let fixture: ComponentFixture<ReservationModal2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationModal2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationModal2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
