import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeReservationComponent } from './liste-reservation.component';

describe('ListeReservationComponent', () => {
  let component: ListeReservationComponent;
  let fixture: ComponentFixture<ListeReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeReservationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
