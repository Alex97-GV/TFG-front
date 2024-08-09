import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestPageComponent } from './interest-page.component';

describe('InterestPageComponent', () => {
  let component: InterestPageComponent;
  let fixture: ComponentFixture<InterestPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterestPageComponent]
    });
    fixture = TestBed.createComponent(InterestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
