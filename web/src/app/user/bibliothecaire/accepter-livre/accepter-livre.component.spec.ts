import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccepterLivreComponent } from './accepter-livre.component';

describe('AccepterLivreComponent', () => {
  let component: AccepterLivreComponent;
  let fixture: ComponentFixture<AccepterLivreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccepterLivreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccepterLivreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
