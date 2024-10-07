import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAutherComponent } from './home-auther.component';

describe('HomeAutherComponent', () => {
  let component: HomeAutherComponent;
  let fixture: ComponentFixture<HomeAutherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeAutherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeAutherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
