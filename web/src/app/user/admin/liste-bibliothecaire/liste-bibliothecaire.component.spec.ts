import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeBibliothecaireComponent } from './liste-bibliothecaire.component';

describe('ListeBibliothecaireComponent', () => {
  let component: ListeBibliothecaireComponent;
  let fixture: ComponentFixture<ListeBibliothecaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeBibliothecaireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeBibliothecaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
