import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeMemberComponent } from './liste-member.component';

describe('ListeMemberComponent', () => {
  let component: ListeMemberComponent;
  let fixture: ComponentFixture<ListeMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeMemberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
