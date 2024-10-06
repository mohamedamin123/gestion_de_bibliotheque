import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBibliothecaireComponent } from './home-bibliothecaire.component';

describe('HomeBibliothecaireComponent', () => {
  let component: HomeBibliothecaireComponent;
  let fixture: ComponentFixture<HomeBibliothecaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeBibliothecaireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeBibliothecaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
