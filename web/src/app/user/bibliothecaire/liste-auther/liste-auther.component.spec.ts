import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAutherComponent } from './liste-auther.component';

describe('ListeAutherComponent', () => {
  let component: ListeAutherComponent;
  let fixture: ComponentFixture<ListeAutherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeAutherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeAutherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
